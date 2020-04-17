import * as uuid from 'uuid'

export type Uuid = string

export default function getUuid() {
  return uuid.v4()
}
