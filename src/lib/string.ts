import { Maybe } from '../types'
import { filterArray } from './array'

export function capitalize(s?: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''
}

export function join(arr: Maybe<string>[], joinString = '') {
  return filterArray(arr).join(joinString)
}
