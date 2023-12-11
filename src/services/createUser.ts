import getConnection from './db';
import { Tuser } from '../types/Tuser'

export default async function createUser(newUser: Tuser) {
    // TODO: req.body is untrusted and should be sanitized
    const pool = getConnection();
    const { name, master_password, email } = newUser

    if (name == null || master_password == null || email == null) {
        throw new Error("name or master_password or email is undefined");
    }

    try {
        const [results]: any = await pool.query("INSERT INTO customers (username, master_password, email) VALUES ( ? , ? , ? )", [name, master_password, email])
        const userId = results.insertId.toString()
        if (userId == null) {
            throw new Error("Unsuccessful");
        }
        return userId
    } catch (error) {
        console.error(error)
    }
}

