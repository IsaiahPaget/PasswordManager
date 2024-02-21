import dotenv from 'dotenv';
import app from './app'
import { Response, Request} from 'express-serve-static-core';
import auth from './auth/auth'
import vault from './vault/vault';

dotenv.config();

const port = process.env.NODE_PORT;

app.get('/', (req: Request, res: Response) => {
    res.send("What up")
});

app.use('/auth', auth)
app.use('/vault', vault)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
