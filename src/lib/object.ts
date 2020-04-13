export function isUndefined(x: any): x is undefined {
  return typeof x !== 'undefined' && x !== null
}
