import gitP, { SimpleGit } from 'simple-git/promise'
import env from './env'

type G = SimpleGit
const git = gitP(env.rootDir)

export const gitStatus = (git: G) => git.status()
export const gitBranchList = (git: G) => git.branch()

export default git
