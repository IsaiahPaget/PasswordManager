import express, { Express, Request, Response } from 'express';
import getUsers from './services/getUsers'
import dotenv from 'dotenv';
import users from './routes/users'

dotenv.config();

const app: Express = express();
const port = process.env.NODE_PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use('/users', users)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
