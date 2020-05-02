/// <reference types="../declarations" />
import CacheConf from 'cache-conf'
import { Maybe } from '../types'
import { GitStore } from './queries'
import getUuid, { Uuid } from './uuid'

export enum StoreKey {
  stash = 'stash',
  status = 'status',
  branches = 'branches',
}

export type StoreItem<T extends object> = T & {
  sessionId: Uuid
  updated: Date
}

export interface Store extends GitStore {
  sessionId: Uuid
  version: number
  created: number
  updated: number
}

const sessionId = getUuid()

const defaultStore: Store = {
  sessionId: sessionId,
  version: 1,
  created: Date.now(),
  updated: Date.now(),
}

const store = new CacheConf({ defaults: defaultStore })

store.set('sessionId', sessionId)

export function getStoreItem<K extends keyof GitStore>(
  key: K
): Maybe<GitStore[K]> {
  const item = store.get(key)
  if (item?.sessionId === store.get('sessionId')) {
    return item
  }
}

export function setStoreItem<K extends keyof GitStore>(
  key: K,
  value?: Omit<Store[K], 'sessionId' | 'updated'>
): GitStore[K] {
  store.set({
    sessionId: sessionId,
    updated: Date.now(),
    [key]: {
      sessionId: sessionId,
      updated: Date.now(),
      ...value,
    },
  })
  return getStoreItem(key)
}

export type StoreHandler<K extends StoreKey> = (item: Store[K]) => void

const handlers: Record<StoreKey, StoreHandler<any>[]> = {
  [StoreKey.branches]: [],
  [StoreKey.status]: [],
  [StoreKey.stash]: [],
}

export function subscribeStore<K extends StoreKey>(
  key: K,
  handler: StoreHandler<K>
) {
  handlers[key] = [...handlers[key], handler]

  return () => {
    handlers[key] = handlers[key].filter((x) => x !== handler)
  }
}

function subscribeStores<K extends StoreKey>(key: K) {
  store.onDidChange(key, (item) => {
    handlers[key].forEach((handler) => {
      handler(item)
    })
  })
}

Object.values(StoreKey).forEach((key) => {
  subscribeStores(key)
})

export default store
