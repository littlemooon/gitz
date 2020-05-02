import { DefaultLogFields } from 'simple-git/typings/response'

export interface Stash {
  hash: string
  date: string
  message: string
  refs: string
  body: string
  authorName: string
  authorEmail: string
}

export function parseStash(stash: DefaultLogFields): Stash {
  return {
    ...stash,
    date: new Date(stash.date).toISOString(),
    authorName: stash.author_name,
    authorEmail: stash.author_email,
  }
}
