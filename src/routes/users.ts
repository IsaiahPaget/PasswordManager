import express from 'express'
import getUser from '../services/getUser';
import createUser from '../services/createUser'
import { Iuser } from 'interfaces/Iuser';

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
        const user: Iuser = req.body
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

