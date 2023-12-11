import dotenv from 'dotenv';
import user from './routes/users'
import app from './app'
import { Response, Request} from 'express-serve-static-core';

dotenv.config();

const port = process.env.NODE_PORT;

app.get('/', (req: Request, res: Response) => {
    res.send("What up")
});

app.use('/user', user)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
