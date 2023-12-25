import Database from "../db";

export default async function getQuery(query: string, param: any[]): Promise<any | undefined>{
    const db = Database.getConnection();
    const [results]: any = await db.query(query, param)
    const data = results
    console.log("getbyidquery: " + JSON.stringify(data))
    if (data == null) {
        throw new Error("Unable to fetch - Possibly invalid params");
    }
    return data
}
