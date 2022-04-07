import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI
const options = {}

let client
let mongoPromise: Promise<MongoClient>;

if (!uri) throw new Error('MongoDB connection URI is not present in environment');

// Code here is from Next.js MongoDB example
if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  mongoPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  mongoPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default mongoPromise