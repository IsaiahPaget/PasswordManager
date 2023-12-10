import express, { Express } from 'express';
const app: Express = express()

// express app config
// this makes the express app able to accept json in the body of an http request
app.use(express.json())
export default app