import { join } from '../lib/string'
import getUuid from '../lib/uuid'
import useConstant from './useConstant'

export default function useUuid(prefix?: string) {
  const uuid = useConstant(() => join([prefix, getUuid()], '-'))
  return uuid
}
