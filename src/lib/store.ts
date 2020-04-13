import Configstore from 'configstore'
import { BranchSummary, StatusResult } from 'simple-git/typings/response'
import packageJson from '../../package.json'

export interface Store {
  status?: StatusResult
  branches?: BranchSummary
}

const initialStore: Store = {}

const store = new Configstore(packageJson.name, initialStore)

export default store
