import cors from 'cors'
import express, { json, urlencoded } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

const createApp = () => {
  const app = express()

  app.use(helmet())

  app.use(cors())

  app.use(json())

  app.use(urlencoded({ extended: true }))

  app.use(morgan('dev'))

  app.get('/', (_req, res) => {
    res.send('<h1>Hello World</h1>')
  })

  return app
}

export default createApp
