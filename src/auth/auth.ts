import express, { Request, Response } from 'express'
import register from './register'
import TNewUser from '../types/TNewUser'
import TUser from '../types/TUser'
import Database from '../db'
import login from './login'
import _ from 'lodash'
import { EMPTY_USER, INVALID_USER_ID } from '../types/errors'

const auth = express.Router()

auth.post('/register', async (req: Request, res: Response) => {
    const user = req.body as TNewUser
    const userId = await register(user, Database.getConnection())

    if (userId == INVALID_USER_ID) {
        res.statusCode = 400
        res.send("invalid fields")
        return
    }
    res.statusCode = 201
    res.send({userId})
})

auth.post('/login', async (req: Request, res: Response) => {
    const user = req.body as TUser 
    const returnedUser = await login(user, Database.getConnection())

    if (_.isEqual(returnedUser, EMPTY_USER)) {
        res.statusCode = 400
        res.send("invalid fields")
        return
    }
    res.statusCode = 200 
    res.send(returnedUser) 
})

export default auth
