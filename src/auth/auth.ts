import express, { Request, Response } from 'express'
import register from './register'
import TUser from 'types/TUser'
import Database from '../db'

const auth = express.Router()

auth.post('/register', async (req: Request, res: Response) => {
    const user = req.body as TUser
    const userId = await register(user, Database.getConnection())

    if (userId == -1) {
        res.statusCode = 400
        res.send("invalid fields")
    }
    res.statusCode = 200
    res.send({userId})
})

auth.post('/login', (req: Request, res: Response) => {
    const user = req.body as TUser 
    res.statusCode = 201 
    res.send("login") 
})

export default auth
