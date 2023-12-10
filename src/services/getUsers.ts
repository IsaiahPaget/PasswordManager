import getConnection from './db';

export default async function getUsers(){
  const pool = getConnection(); 
  let results:any;
  try {
    results = await pool.query("SELECT * FROM customers")
    console.log(results)
  } catch (error) {
    console.error(error)
  }
  return results
}

