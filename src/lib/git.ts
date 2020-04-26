import gitP from 'simple-git/promise'
import env from './env'

const git = gitP(env.rootDir)

export default git
