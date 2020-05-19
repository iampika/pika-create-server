import connectRedis from 'connect-redis'
import cors from 'cors'
import express, {
  json,
  urlencoded,
} from 'express'
import session from 'express-session'
import helmet from 'helmet'
import morgan from 'morgan'
import redis from 'redis'

import {
  REDIS_OPTIONS,
  SESSION_OPTIONS,
} from './config'
import {
  notFound,
  serverError,
} from './middleware'

const RedisStore = connectRedis(session)
const client = redis.createClient(REDIS_OPTIONS)

const createApp = async (db) => {
  const app = express()
  const users = await db.users.find({}).toArray()

  app.use(helmet())

  app.use(cors())

  app.use(json())

  app.use(urlencoded({ extended: true }))

  app.use(morgan('dev'))

  app.use(
    session({
      ...SESSION_OPTIONS,
      store: new RedisStore({ client }),
    }),
  )

  app.get('/', (req, res) => {
    res.status(200).json({ users })
  })

  app.use(notFound)

  app.use(serverError)

  return app
}

export default createApp
