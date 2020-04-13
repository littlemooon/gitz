"use strict";
exports.__esModule = true;
var _a = process.env, DIR = _a.DIR, MASTER_BRANCH = _a.MASTER_BRANCH, ISSUE_REGEX = _a.ISSUE_REGEX, FEATURE_BRANCH_REGEX = _a.FEATURE_BRANCH_REGEX;
var issueRegex = RegExp(ISSUE_REGEX !== null && ISSUE_REGEX !== void 0 ? ISSUE_REGEX : /[a-zA-Z]+-\d+/);
var env = {
    rootDir: DIR !== null && DIR !== void 0 ? DIR : process.cwd(),
    masterBranch: MASTER_BRANCH !== null && MASTER_BRANCH !== void 0 ? MASTER_BRANCH : 'master',
    issueRegex: issueRegex,
    featureBranchRegex: RegExp(FEATURE_BRANCH_REGEX !== null && FEATURE_BRANCH_REGEX !== void 0 ? FEATURE_BRANCH_REGEX : "^feature-(" + issueRegex
        .toString()
        .replace(/^\//, '')
        .replace(/\/$/, '') + ")-(.*)")
};
exports["default"] = env;
