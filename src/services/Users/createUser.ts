import { TUser } from 'types/TUser';
import Database from '../db';

export default async function createUser(newUser: TUser) {
    // TODO: newUser is untrusted and should be sanitized
    const db = Database.getConnection();
    const { first_name, last_name, master_password, email } = newUser

    const newUserValues = [first_name, last_name, master_password, email]

    newUserValues.forEach(element => {
        if (element == null) {
            throw new Error("param is undefined");
        }
    });

    try {
        const [results]: any = await db.query("INSERT INTO Users (last_name, first_name, master_password, email) VALUES ( ? , ?, ?, ?)", [first_name, last_name, master_password, email])
        const userId = results.insertId.toString()
        if (userId == null) {
            throw new Error("Unsuccessful");
        }
        return userId
    } catch (error) {
        console.error(error)
    }
}

