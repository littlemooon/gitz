import * as uuid from 'uuid'
import { join } from './string'

export type Uuid = string

export default function getUuid(prefix?: string) {
  return join([prefix, uuid.v4(), '-'])
}
