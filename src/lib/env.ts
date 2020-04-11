export interface Env {
  rootDir: string
}

const env: Env = {
  rootDir: process.env.DIR ?? process.cwd(),
}

export default env
