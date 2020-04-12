export function arrayRotate<T>(arr: T[], count: number) {
  const x = arr.slice()
  return x.splice(-count % x.length).concat(x)
}

export function filterArray<T>(arr: (T | undefined)[]): T[] {
  return arr.filter((x) => typeof x !== 'undefined' && x !== null) as T[]
}
