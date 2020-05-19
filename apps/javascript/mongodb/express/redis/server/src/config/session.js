import { IN_PROD } from './app'

const HALF_HOUR = 1000 * 60 * 30

const {
  SESSION_NAME = 'sid',
  SESSION_SECRET = 'keep it secret, keep it safe',
  SESSION_IDLE_TIME = HALF_HOUR,
} = process.env

export const COOKIE_OPTIONS = {
  secure: IN_PROD,
  maxAge: +SESSION_IDLE_TIME,
  httpOnly: true,
  sameSite: true,
}

export const SESSION_OPTIONS = {
  name: SESSION_NAME,
  secret: SESSION_SECRET,
  cookie: COOKIE_OPTIONS,
  rolling: true,
  resave: false,
  saveUninitialized: true,
}
