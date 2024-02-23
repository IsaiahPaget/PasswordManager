import Database from "../db";
import { Request } from "express";
import TUser from "types/TUser";

async function register(user: TUser, db: Database): Promise<number> {
    if (user.firstName == "" || user.firstName == null) {
        return -1
    }
    if (user.lastName == "" || user.lastName == null) {
        return -1
    }
    if (user.masterPassword == "" || user.masterPassword == null) {
        return -1
    }
    if (user.email == "" || user.email == null) {
        return -1
    }

    try {
        const datetime = new Date().toISOString().slice(0,10);
        const result = await db.query(
            "INSERT INTO Users (last_name, first_name, master_password, email, account_created_on) VALUES (?, ?, ?, ?, ?)", 
            [user.firstName, user.lastName, user.masterPassword, user.email, datetime]
        )
        const userId = parseInt(result[0].insertId)
        return userId
    } catch (error) {
        console.error(error)
        return -1
    }
}

export default register
