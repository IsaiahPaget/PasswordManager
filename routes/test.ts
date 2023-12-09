import express from 'express'
import mysql from 'mysql2'

const router = express.Router();

const getData = async () => {
  const pool = mysql.createPool({
    host: 'damienstewart.me',
    database: 'nec90e5_pwmgr',
    password: 'Bogart-bacall-wedding-MOVIE-432678!^&*',
    user: 'nec90e5_pwmgr'
  }).promise()


  const connection = await pool.getConnection()
  console.log(connection)
  const results = await pool.query("SELECT * FROM user")

  console.log(results)

}
async function test () {
  const mysql = require('mysql2/promise');
  const conn = await mysql.createConnection({
    host: 'damienstewart.me',
    database: 'nec90e5_pwmgr',
    password: 'Bogart-bacall-wedding-MOVIE-432678!^&*',
    user: 'nec90e5_pwmgr'
  });
  const [rows, fields] = await conn.execute('SELECT * FROM users');
  await conn.end();
  return [rows, fields]
}
/* GET users. */
router.get('/', async function(req, res, next) {
  try {
    res.send(await test());
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

export default router
