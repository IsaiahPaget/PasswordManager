import express from 'express'
import getUsers from '../services/getUsers';

const router = express.Router();
/* GET users. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await getUsers());
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

export default router
