import getConnection from './db';
// import { emptyOrRows } from '../helper';

export default async function getUsers(){
  const pool = getConnection(); 
  let results:any;
  try {
    results = await pool.query("SELECT * FROM users")
    console.log(results)
  } catch (error) {
    console.error(error)
  }
  return results
}

