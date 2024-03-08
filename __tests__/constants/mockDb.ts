import mysql from 'mysql2'
import IDb from '../../src/IDb'

export default class MockDB implements IDb {

    public async query(sql: string, params?: Array<any>): Promise<any> {
        if (sql.indexOf("SELECT") === -1) {
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
        return [
            [
                {
                    "id": "7",
                    "lastName": "isaiah",
                    "firstName": "blah",
                    "email": "isaiah@mail.com"
                }
            ]
        ]
    }
}
