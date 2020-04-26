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
  gitz                      index of commands
  gitz status               (s) current branch status
  gitz branch <name?>       (b) create new feature branch
  gitz checkout             (c) switch to feature branch
  gitz commit <message?>    (m) commit with issueId
  gitz update               (u) rebase current branch onto ${env.masterBranch}

Options:
  --help        Show this screen
  --version     Show version
  -d --debug    Run with debug logs
```
