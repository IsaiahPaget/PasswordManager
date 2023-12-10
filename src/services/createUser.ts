import getConnection from './db';
import { Request } from 'express-serve-static-core';

export default async function createUser(req: Request){
  const pool = getConnection();
  console.log(req)
  const {name, master_password, email} = req.body
  let results
  try {
    [results] = await pool.query("INSERT INTO customers (username, master_password, email) VALUES ( ? , ? , ? )", [name, master_password, email])
    console.log(results)
  } catch (error) {
    console.error(error)
  }
  return results
}

