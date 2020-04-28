/// <reference types="../declarations" />
import CacheConf from 'cache-conf'
import { Maybe } from '../types'
import { GitStore } from './gitOperations'
import getUuid, { Uuid } from './uuid'

export enum StoreKey {
  status = 'status',
  branches = 'branches',
  checkout = 'checkout',
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

export default store
