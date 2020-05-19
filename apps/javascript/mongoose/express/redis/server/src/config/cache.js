const {
  REDIS_PORT = 6379,
  REDIS_HOST = 'localhost',
  REDIS_PASSWORD = 'secret',
} = process.env

export const REDIS_OPTIONS = {
  port: +REDIS_PORT,
  host: REDIS_HOST,
  pass: REDIS_PASSWORD,
}

export default REDIS_OPTIONS
