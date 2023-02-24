import mongoose from 'mongoose'

const { MONGODB_URI, MONGODB_DB } = process.env

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    mongoose.set('strictQuery', false)
    cached.promise = mongoose
      .connect(`${MONGODB_URI}/${MONGODB_DB}?retryWrites=true&w=majority`)
      .then((mongoose) => {
        console.log(`Connected to ${MONGODB_DB} successfully!`)
        return mongoose
      })
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
