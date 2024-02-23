import Database from "db"

export default interface IDb {
    query(sql: string, params?: Array<any>): Promise<any>
}
