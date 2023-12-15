import express from 'express'
import getUser from '../services/Users/getUser';
import createUser from '../services/Users/createUser'
import { TUser } from 'types/TUser';

const user = express.Router();

/* GET users. */
user.get('/:id', async function (req, res) {
    try {
        const id = req.params.id
        const user = await getUser(id)
        if (user == undefined) {
            res.statusCode = 400
            res.send("Invalid Request")
        }
        res.json(user);
    } catch (err) {
        console.error("Error: ", err);
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
            res.statusCode = 400
            res.send("Invalid Request")
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

