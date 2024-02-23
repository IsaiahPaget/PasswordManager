import mysql from 'mysql2'
import Database from '../../src/db';
import IDb from '../../src/IDb'

export default class MockDB implements IDb {

    public async query(sql: string, params?: Array<any>): Promise<any> {
        return [
            {
                "fieldCount": 0,
                "affectedRows": 1,
                "insertId": 15,
                "info": '',
                "serverStatus": 2,
                "warningStatus": 0,
                "changedRows": 0,
            }
        ]
    }
}
