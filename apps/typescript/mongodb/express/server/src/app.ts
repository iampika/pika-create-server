import cors from 'cors'
import express, {
  Application,
  json,
  urlencoded,
} from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import { Database } from './config'
import {
  notFound,
  serverError,
} from './middleware'

const createApp = async (db: Database): Promise<Application> => {
  const app = express()
  const users = await db.users.find({}).toArray()

  app.use(helmet())

  app.use(cors())

  app.use(json())

  app.use(urlencoded({ extended: true }))

  app.use(morgan('dev'))

  app.get('/', (_req, res) => {
    res.status(200).json({ users })
  })

  app.use(notFound)

  app.use(serverError)

  return app
}

export default createApp
