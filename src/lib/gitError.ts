const gitErrorMap = {
  localFiles: {
    regex: /Your local changes to the following files would be overwritten by checkout:/,
    message: 'Local files must be committed or stashed',
  },
}

export function parseGitError(error?: Error): string | undefined {
  if (error) {
    const gitError = Object.values(gitErrorMap).find(({ regex, message }) =>
      regex.exec(error.message) ? message : undefined
    )

    return gitError?.message ?? error?.message
  }
}
