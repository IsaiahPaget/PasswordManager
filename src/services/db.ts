import mysql from 'mysql2'
import config from '../config';

export default class Database {
    private static instance: Database;
    private static pool = mysql.createPool(config.db).promise()

    private constructor() { }

    public static getConnection(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async query(sql: string, params?: Array<any>): Promise<any> {
        if (params == null) {
            return Database.pool.query(sql)
        }
        return Database.pool.query(sql, params)
    }
}

