import Database from '../db'
export default async function deleteByIdQuery(query: string, id: string): Promise<string | undefined> {
    const db = Database.getConnection()    
    const [results] = await db.query(query, [id])
    const data = results[0]
    console.log(data)
    if (data == null) {
        throw new Error("Unable to delete - Possible invalid params");
    }
    
    return data
}