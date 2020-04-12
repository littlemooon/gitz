export type Env = {
  rootDir: string
  masterBranch: string
  issueRegex: RegExp
  featureBranchRegex: RegExp
}

const { DIR, MASTER_BRANCH, ISSUE_REGEX, FEATURE_BRANCH_REGEX } = process.env

const issueRegex = RegExp(ISSUE_REGEX ?? /[a-zA-Z]+-\d+/)

const env: Env = {
  rootDir: DIR ?? process.cwd(),
  masterBranch: MASTER_BRANCH ?? 'master',
  issueRegex,
  featureBranchRegex: RegExp(
    FEATURE_BRANCH_REGEX ??
      `^feature-(${issueRegex
        .toString()
        .replace(/^\//, '')
        .replace(/\/$/, '')})-(.*)`
  ),
}

export default env
