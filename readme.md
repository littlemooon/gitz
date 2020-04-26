# gitz

Interactive git client for feature workflow

## Run

```bash
npm install --global gitz
cd my-git-repo
gitz
```

## CLI

```
$ gitz --help

Usage:
  gitz                      Index of commands
  gitz status               (s) Current branch status
  gitz branch <name?>       (b) Create new feature branch
  gitz checkout             (c) Switch to feature branch
  gitz commit <message?>    (m) Commit with issueId
  gitz update               (u) Rebase current branch onto ${env.masterBranch}

Options:
  -h --help                 Show this screen
  -v --version              Show version
  -d --debug                Run with debug logs
```
