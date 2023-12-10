import getConnection from './db';
import { Request } from 'express-serve-static-core';

export default async function getUser(req: Request){
  const pool = getConnection(); 
  const {id} = req.params
  let results
  try {
    [results] = await pool.query("SELECT * FROM customers WHERE id = ?",[id])
    console.log(results)
  } catch (error) {
    console.error(error)
  }
  return results
}

