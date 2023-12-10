import express from 'express'
import getUser from '../services/getUser';
import createUser from '../services/createUser'

const user = express.Router();

/* GET users. */
user.get('/:id', async function (req, res, next) {
  try {
    const user = await getUser(req)
    if (user == undefined) {
      res.send("Invalid Request")
    }
      res.json(user);
  } catch (err) {
    console.error("Error: ", err);
    next(err);
  }
});

/* POST users. */
user.post('/', async function (req, res, next) {
    try {
      await createUser(req)
      res.status(201).send(res.statusCode);
    } catch (err) {
      console.error("Error: ", err);
      next(err);
    }
});

export default user

