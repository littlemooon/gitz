import { CliCommand } from './command'

const gitErrorMap: Record<
  string,
  { regex: RegExp; message: string; commands?: CliCommand[] }
> = {
  localFiles: {
    regex: /Your local changes to the following files would be overwritten by checkout:/,
    message: 'Local files must be committed or stashed',
  },
}

export function parseGitError(
  error?: Error
): { message?: string; commands?: CliCommand[] } | undefined {
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
