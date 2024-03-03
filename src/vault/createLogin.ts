import TNewLogin from "types/TNewLogin";
import TUser from "../types/TUser";
import IDb from "IDb";
import userValidate from "auth/userValidate";
import { EMPTY_USER, INVALID_LOGIN_ID } from "types/errors";
import newLoginValidate from "auth/newLoginValidate";
import login from "../auth/login";
import TNewUser from "types/TNewUser";
import _ from 'lodash'

async function createLogin(user: TUser, newLogin: TNewLogin, db: IDb): Promise<number> {
    const isValidUser = userValidate(user)    
    if (!isValidUser) {
        return INVALID_LOGIN_ID
    }

    const isValidLogin = newLoginValidate(newLogin)
    if (!isValidLogin) {
        return INVALID_LOGIN_ID
    }

    try {
        const loggedInUser = await login(user as TNewUser, db)
        if (_.isEqual(loggedInUser, EMPTY_USER)) {
             return INVALID_LOGIN_ID
        }

        const [result] = await db.query(
            "INSERT INTO Logins (user_id, Logins_name, Logins_url, Logins_password, Logins_notes) VALUES (?, ?, ?, ?, ?)",
            [newLogin.userId, newLogin.loginName, newLogin.loginUrl, newLogin.loginPassword, newLogin.loginNotes]
        )
        return result.insertId

    } catch (error) {
        console.error(error)
        return INVALID_LOGIN_ID
    }



}

export default createLogin
