import Database from "../db";

export default async function createOrUpdateQuery(query: string, params: Array<any>): Promise<string | undefined> {
    const db = Database.getConnection();
    const [results]: any = await db.query(query, params)
    const id = results.insertId.toString()
    if (id == null) {
        throw new Error("Unsuccessful");
    }
    return id
}
