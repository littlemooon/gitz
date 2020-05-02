import { CliCommandKey } from './command'

export interface GitError {
  regex?: RegExp
  message: string
  commands?: CliCommandKey[]
  exit?: boolean
}

const gitErrorMap: Record<string, GitError & { regex: RegExp }> = {
  localFiles: {
    regex: /Your local changes to the following files would be overwritten by checkout:/,
    message: 'Local files must be committed or stashed',
    commands: [CliCommandKey.commit, CliCommandKey.stash],
  },
  pushBehind: {
    regex: /Updates were rejected because the tip of your current branch is behind/,
    message: 'Local branch is behind remote',
    commands: [CliCommandKey.pull],
  },
  mergeFailed: {
    regex: /Failed to merge in the changes/,
    message: 'Fix local merge issues then run `git rebase --continue`',
    exit: true,
  },
}

export function parseGitError(error?: Error): GitError | undefined {
  if (error) {
    const gitError = Object.values(gitErrorMap).find(({ regex, message }) =>
      regex.exec(error.message) ? message : undefined
    )

    return {
      ...gitError,
      message: gitError?.message ?? error?.message,
    }
  }
}
