import { CliCommandKey } from './command'

const gitErrorMap: Record<
  string,
  { regex: RegExp; message: string; commands?: CliCommandKey[] }
> = {
  localFiles: {
    regex: /Your local changes to the following files would be overwritten by checkout:/,
    message: 'Local files must be committed or stashed',
    commands: [CliCommandKey.commit, CliCommandKey.stash],
  },
  upstreamMismatch: {
    regex: /The upstream branch of your current branch does not match/,
    message: 'Remote branch has a different name',
    commands: [CliCommandKey.pushOrigin, CliCommandKey.pushOriginMaster],
  },
}

export function parseGitError(
  error?: Error
): { message?: string; commands?: CliCommandKey[] } | undefined {
  if (error) {
    const gitError = Object.values(gitErrorMap).find(({ regex, message }) =>
      regex.exec(error.message) ? message : undefined
    )

    return {
      message: gitError?.message ?? error?.message,
      commands: gitError?.commands,
    }
  }
}
