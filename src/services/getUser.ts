import getConnection from './db';

export default async function getUser(id: string) {
    // TODO: Id is untrusted and should be sanitized
    const pool = getConnection();
    
    if (id == null) {
        throw new Error("No such user");
    }

    try {
        const [results]:any = await pool.query("SELECT * FROM customers WHERE id = ?", [id])
        // results comes back as an array with one object in it
        const data = results[0]

        if (data == null) {
            throw new Error("Unable to fetch user - Possibly invalid params");
        }

        return data
    } catch (error) {
        console.error(error)
    }
}

