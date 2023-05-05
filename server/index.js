import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js';

// Routes

const app = express();

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

dotenv.config();


const client = new MongoClient(process.env.MONGO_DB, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  await client.connect()
    .then(() =>
      app.listen(process.env.PORT, () =>
        console.log(`listening on port ${process.env.PORT}`)));
}
run().catch(console.dir)

// usage of Routes 
app.use('/auth', AuthRoute);
