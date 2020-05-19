import {
  connect,
  ConnectionOptions,
} from 'mongoose'

export const {
  MONGO_URI = 'mongodb://localhost:27017',
} = process.env

export const MONGO_OPTIONS: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

export const connectDatabase = async (): Promise<void> => {
  try {
    await connect(MONGO_URI, MONGO_OPTIONS)
  } catch (err) {
    throw new Error(`MongoDB not connected: ${err.message}`)
  }
}
