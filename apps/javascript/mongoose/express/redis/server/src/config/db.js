import { connect } from 'mongoose'

export const {
  MONGO_URI = 'mongodb://localhost:27017',
} = process.env

export const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

export const connectDatabase = async () => {
  try {
    await connect(MONGO_URI, MONGO_OPTIONS)
  } catch (err) {
    throw new Error(`MongoDB not connected: ${err.message}`)
  }
}
