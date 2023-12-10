import dotenv from 'dotenv';
import users from './routes/users'
import app from './app'
import { Request, Response} from 'express-serve-static-core';

dotenv.config();

const port = process.env.NODE_PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('Expresses += TypeScript Servers');
});

app.use('/users', users)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
