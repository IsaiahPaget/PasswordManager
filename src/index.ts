import dotenv from 'dotenv';
import app from './app'
import { Response, Request} from 'express-serve-static-core';

// Routes
import user from './routes/users'
import vault from './routes/vault';

dotenv.config();

const port = process.env.NODE_PORT;

app.get('/', (req: Request, res: Response) => {
    res.send("What up")
});

app.use("/vault", vault)
app.use('/user', user)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
