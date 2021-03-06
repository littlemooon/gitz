export function arrayRotate<T>(arr: T[], count: number) {
  const x = arr.slice()
  return x.splice(-count % x.length).concat(x)
}

export function filterArray<T>(arr: (T | undefined)[]): T[] {
  return arr.filter((x) => typeof x !== 'undefined' && x !== null) as T[]
}

export function arrayOfLength(length: number): number[] {
  return Array.from({ length }, (_, i) => i)
}

export function toArray(obj?: any) {
  return Array.isArray(obj) ? obj : [obj]
}
