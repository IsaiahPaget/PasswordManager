import express from 'express'
import getUser from '../services/users/getUser';
import createUser from '../services/users/createUser'
import { TUser } from 'types/TUser';

const user = express.Router();

/* GET users. */
user.get('/:id', async function (req, res) {
    try {
        const id = req.params.id
        const user = await getUser(id)
        if (user == null) {
            throw new Error("Could not get user");
        } 
        res.json(user);
    } catch (err) {
        console.error(err);
        res.statusCode = 400
        res.send("Invalid Request")
    }
});

/* POST users. */
user.post('/', async function (req, res) {
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

