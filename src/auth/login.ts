import TNewUser from "types/TNewUser";
import newUserValidate from "./newUserValidate";
import IDb from "IDb";
import TUser from "types/TUser";
import { EMPTY_USER } from "../types/errors";

async function login(user: TNewUser, db: IDb): Promise<TUser> {

    const isValidUser = newUserValidate(user)

    if (!isValidUser) {
        return EMPTY_USER
    }

    try {
        // TODO: make the query need the first and last name of the user
        const [result] = await db.query(
            "SELECT id, last_name, first_name, email, account_created_on FROM Users WHERE email = ? AND master_password = ?",
            [user.email, user.masterPassword]
        )
        
        return result as TUser

    } catch (error) {
        console.error(error)
        return EMPTY_USER
    }
}

export default login
