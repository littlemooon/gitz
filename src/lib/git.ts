import gitP from 'simple-git/promise'
import cli from './cli'

const git = gitP(cli.flags.root)

export default git
