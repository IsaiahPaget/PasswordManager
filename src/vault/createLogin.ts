import TNewLogin from "types/TNewLogin";
import TNewUser from "../types/TNewUser";
import IDb from "IDb";
import newUserValidate from "../auth/newUserValidate";
import { EMPTY_USER, INVALID_LOGIN_ID } from "../types/errors";
import newLoginValidate from "../auth/newLoginValidate";
import login from "../auth/login";
import _ from 'lodash'

async function createLogin(user: TNewUser, newLogin: TNewLogin, db: IDb): Promise<number> {
    const isValidUser = newUserValidate(user)    
    if (!isValidUser) {
        return INVALID_LOGIN_ID
    }

    const isValidLogin = newLoginValidate(newLogin)
    if (!isValidLogin) {
        return INVALID_LOGIN_ID
    }

    try {
        const loggedInUser = await login(user, db)
        if (_.isEqual(loggedInUser, EMPTY_USER) || loggedInUser == null) {
             return INVALID_LOGIN_ID
        }

        const [result] = await db.query(
            "INSERT INTO Logins (user_id, Logins_name, Logins_url, Logins_password, Logins_notes) VALUES (?, ?, ?, ?, ?)",
            [loggedInUser.id, newLogin.loginName, newLogin.loginUrl, newLogin.loginPassword, newLogin.loginNotes]
        )
        return result.insertId

    } catch (error) {
        console.error(error)
        return INVALID_LOGIN_ID
    }
}

export default createLogin
