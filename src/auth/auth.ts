import express, { Request, Response } from 'express'
import register from './register'
import TNewUser from 'types/TNewUser'
import Database from '../db'
import login from './login'

const auth = express.Router()

auth.post('/register', async (req: Request, res: Response) => {
    const user = req.body as TNewUser
    const userId = await register(user, Database.getConnection())

    if (userId == -1) {
        res.statusCode = 400
        res.send("invalid fields")
        return
    }
    res.statusCode = 200
    res.send({userId})
})

auth.post('/login', async (req: Request, res: Response) => {
    const user = req.body as TNewUser 
    const returnedUser = await login(user, Database.getConnection())

    if (Object.keys(returnedUser).length < 1) {
        res.statusCode = 400
        res.send("invalid fields")
        return
    }
    res.statusCode = 201 
    res.send(returnedUser) 
})

export default auth
