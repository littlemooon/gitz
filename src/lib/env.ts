export type Env = {
  remoteOrigin: string
  masterBranch: string
  issueRegex: RegExp
  featureBranchRegex: RegExp
  commitRegex: RegExp
}

const {
  MASTER_BRANCH,
  ISSUE_REGEX,
  FEATURE_BRANCH_REGEX,
  REMOTE_ORIGIN,
} = process.env

export const jiraRegex = /[a-zA-Z]+-\d+/

const issueRegex = RegExp(ISSUE_REGEX ?? jiraRegex)

const env: Env = {
  remoteOrigin: REMOTE_ORIGIN ?? 'origin',
  masterBranch: MASTER_BRANCH ?? 'master',
  issueRegex,
  featureBranchRegex: RegExp(
    FEATURE_BRANCH_REGEX ??
      `^feature-(${issueRegex
        .toString()
        .replace(/^\//, '')
        .replace(/\/$/, '')})-(.*)`
  ),
  commitRegex: RegExp(
    `([\\w\\s]+)(\\s?jiraid:\\s?(${issueRegex
      .toString()
      .replace(/^\//, '')
      .replace(/\/$/, '')}))`
  ),
}

export default env
