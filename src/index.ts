import dotenv from 'dotenv';
import user from './routes/users'
import app from './app'
import { Request, Response} from 'express-serve-static-core';

dotenv.config();

const port = process.env.NODE_PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('Whats good B?');
});

app.use('/users', user)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
