import cors from 'cors'
import express, {
  json,
  urlencoded,
} from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import {
  notFound,
  serverError,
} from './middleware'

const createApp = async (db) => {
  const app = express()
  const users = await db.users.find({}).toArray()

  app.use(helmet())

  app.use(cors())

  app.use(json())

  app.use(urlencoded({ extended: true }))

  app.use(morgan('dev'))

  app.get('/', (req, res) => {
    res.status(200).json({ users })
  })

  app.use(notFound)

  app.use(serverError)

  return app
}

export default createApp
