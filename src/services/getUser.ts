import getConnection from './db';
import { Request } from 'express-serve-static-core';

export default async function getUser(req: Request) {
  const pool = getConnection();
  const { id } = req.params
  try {
    const [results] = await pool.query("SELECT * FROM customers WHERE id = ?", [id])
    if (results != null && results != undefined) {
      return results
    }
    console.log(results)
  } catch (error) {
    console.error(error)
  }
}

