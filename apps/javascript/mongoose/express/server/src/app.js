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

const createApp = async () => {
  const app = express()

  app.use(helmet())

  app.use(cors())

  app.use(json())

  app.use(urlencoded({ extended: true }))

  app.use(morgan('dev'))

  app.get('/', (_req, res) => {
    res.status(200).json({ hello: 'world' })
  })

  app.use(notFound)

  app.use(serverError)

  return app
}

export default createApp
