import express from 'express'
import createUser from '../services/users/createUser'
import { TUser } from 'types/TUser';
import isValidUser from '../services/auth/isValidUser';
import getVault from '../services/vaults/getVault';
import getUser from '../services/users/getUser';

const user = express.Router();

/* post users/login */
user.post('/login', async function (req, res) {
    try {
        const reqBody = req.body as TUser
        const isValid = await isValidUser(reqBody)
        if (isValid == null || isValid === false) {
            throw new Error("error checking validity")
        }
        const user = await getUser(reqBody.email)
        const vault = await getVault(user?.id)
        if (vault == null) {
            throw new Error("Could not get vault");
        } 
        res.json(vault);
    } catch (err) {
        console.error(err);
        res.statusCode = 400
        res.send("Invalid Request")
    }
});

/* POST users. */
user.post('/signup', async function (req, res) {
    try {
        const user: TUser = req.body
        const userId = await createUser(user)
        if (userId == null) {
            throw new Error("Could not create user");
        }
        res.statusCode = 201
        res.send(userId);
    } catch (err) {
        console.log(err)
        res.statusCode = 400
        res.send("Invalid Request")
    }
});

export default user

