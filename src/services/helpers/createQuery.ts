import Database from "../db";

export default async function createQuery(query: string, params: Array<any>) {
    const db = Database.getConnection();
    const [results]: any = await db.query(query, params)
    const id = results.insertId.toString()
    if (id == null) {
        throw new Error("Unsuccessful");
    }
    return id
}