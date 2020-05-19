import { MongoClient } from 'mongodb'

export const {
  MONGO_URI = 'mongodb://localhost:27017',
} = process.env

export const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

export const connectDatabase = async () => {
  try {
    const client = await MongoClient.connect(
      MONGO_URI,
      MONGO_OPTIONS,
    )

    const db = await client.db()

    return {
      users: db.collection('users'),
    }
  } catch (err) {
    throw new Error(`MongoDB not connected: ${err.message}`)
  }
}
