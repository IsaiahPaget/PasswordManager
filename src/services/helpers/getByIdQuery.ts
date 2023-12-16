import Database from "../db";

export default async function getByIdQuery(query: string, id: string) {
    const db = Database.getConnection();
    const [results]: any = await db.query(query, [id])
    const data = results[0]
    if (data == null) {
        throw new Error("Unable to fetch - Possibly invalid params");
    }
    return data
}