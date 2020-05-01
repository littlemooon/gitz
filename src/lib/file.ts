/* eslint-disable @typescript-eslint/camelcase */
import { ColorProps } from 'ink'
import { FileStatusSumary } from 'simple-git/typings/response'

export enum FileStatusKey {
  'conflicted' = 'C',
  'renamed' = 'R',
  'modified' = 'M',
  'deleted' = 'D',
  'added' = 'A',
  'unstaged' = 'U',
}

export const fileStatusKeys = Object.values(FileStatusKey)

export interface FileStatus {
  key: FileStatusKey
  label: string
  color: ColorProps
}

export enum FileStatusType {
  'staged' = 'staged',
  'working' = 'working',
}

export const fileStatusContexts = Object.values(FileStatusType)

export interface File extends Record<FileStatusType, FileStatus | undefined> {
  path: string
}

const fileStatusMap: Record<string, FileStatus> = {
  C: {
    key: FileStatusKey.conflicted,
    label: 'Conflicted',
    color: { yellow: true },
  },
  R: {
    key: FileStatusKey.renamed,
    label: 'Renamed',
    color: { green: true },
  },
  M: {
    key: FileStatusKey.modified,
    label: 'Modified',
    color: { cyan: true },
  },
  D: { key: FileStatusKey.deleted, label: 'Deleted', color: { red: true } },
  A: { key: FileStatusKey.added, label: 'Added', color: { green: true } },
  '?': {
    key: FileStatusKey.unstaged,
    label: 'Unstaged',
    color: { green: true },
  },
}

export function parseFile(file: FileStatusSumary): File {
  return {
    path: file.path,
    staged: file.index === '?' ? undefined : fileStatusMap[file.index],
    working: fileStatusMap[file.working_dir],
  }
}

export type FileStatusCount = Record<
  FileStatusKey,
  FileStatus & { count: number }
>

export function getFileStatusCount(
  context: FileStatusType,
  files: File[]
): FileStatusCount {
  return files.reduce((acc, file) => {
    const key = file[context]?.key
    return key
      ? { ...acc, [key]: { ...acc[key], count: acc[key].count + 1 } }
      : acc
  }, fileStatusKeys.reduce((acc, key) => ({ ...acc, [key]: { ...fileStatusMap[key], count: 0 } }), {}) as FileStatusCount)
}
