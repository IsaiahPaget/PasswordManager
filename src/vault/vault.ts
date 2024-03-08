import express from 'express'
import TNewLogin from 'types/TNewLogin'
import createLogin from './createLogin'
import Database from '../db'
import TUser from 'types/TUser'
import { EMPTY_VAULT, INVALID_LOGIN_ID } from '../types/errors'
import TVaultNewLogin from 'types/TVaultNewLogin'
import TNewUser from 'types/TNewUser'
import getVault from './getVault'
import _ from 'lodash'

const vault = express.Router()

// get all logins without any sensitive data 
vault.post('/', async (req, res) => {
    const user = req.body as TNewUser
    const vault = await getVault(user, Database.getConnection())
    if (_.isEqual(vault, EMPTY_VAULT)) {
        res.statusCode = 400
        res.send("invalid fields")
        return
    }
    res.statusCode = 200
    res.send(vault) 
})

// get the sensitive data about one login
vault.post('/get/:loginid', (req, res) => {
    res.send("get single login") 
})

// update a single login
vault.post('/update/:loginid', (req, res) => {
    res.send("update single login") 
})

// create a single new login
vault.post('/new', async (req, res) => {
    const vaultNewLogin = req.body as TVaultNewLogin
    const user = vaultNewLogin.auth
    const login = vaultNewLogin.login
    const loginId = await createLogin(user, login, Database.getConnection())
    if (loginId == INVALID_LOGIN_ID) {
        res.statusCode = 400
        res.send("invalid fields")
        return
    }
    res.statusCode = 200
    res.send({loginId}) 
})

// delet a single login
vault.post('/delete/:loginid', (req, res) => {
    res.send("delete login") 
})

export default vault
