import { Maybe } from '../types'
import { filterArray } from './array'

export function capitalize(s?: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''
}

export function join(arr: Maybe<string>[], joinString = '') {
  return filterArray(arr).join(joinString)
}

export function reduceWhitespace(s?: string) {
  return s ? s.replace(/  +/g, ' ').trim() : ''
}

export function getMaxLength(arr: string[]): number {
  return Math.max(...arr.map((s) => s.length))
}

export function startsWith(s?: string, x?: string) {
  return s ? s.startsWith(x ?? '') : false
}
