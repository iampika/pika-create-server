import {
  Collection,
  MongoClient,
  MongoClientOptions,
} from 'mongodb'

export const {
  MONGO_URI = 'mongodb://localhost:27017',
} = process.env

export const MONGO_OPTIONS: MongoClientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

export interface Database {
  users: Collection<any>
}

export const connectDatabase = async (): Promise<Database> => {
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
