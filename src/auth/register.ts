import IDb from "IDb";
import Database from "../db";
import { Request } from "express";
import TNewUser from "types/TNewUser";
import newUserValidate from "../auth/newUserValidate"
import { INVALID_USER_ID } from "../types/errors";

async function register(user: TNewUser, db: IDb): Promise<number> {
    const userIsValid = newUserValidate(user)

    if (!userIsValid) {
        return INVALID_USER_ID
    }

    try {
        const datetime = new Date().toISOString().slice(0,10);
        const [result] = await db.query(
            "INSERT INTO Users (last_name, first_name, master_password, email, account_created_on) VALUES (?, ?, ?, ?, ?)", 
            [user.firstName, user.lastName, user.masterPassword, user.email, datetime]
        )
        const userId = parseInt(result.insertId)
        return userId
    } catch (error) {
        console.error(error)
        return INVALID_USER_ID
    }
}

export default register
