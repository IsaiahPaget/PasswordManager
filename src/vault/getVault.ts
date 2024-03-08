import IDb from "IDb";
import newUserValidate from "../auth/newUserValidate";
import TNewUser from "../types/TNewUser";
import TVault from "../types/TVault";
import { EMPTY_VAULT, EMPTY_USER } from "../types/errors";
import login from "../auth/login";
import _ from 'lodash'

async function getVault(user: TNewUser, db: IDb): Promise<TVault> {
    const isUserValid = newUserValidate(user)
    if (!isUserValid) {
        return EMPTY_VAULT
    }
    
    try {
        const loggedInUser = await login(user, db)
        if (_.isEqual(loggedInUser, EMPTY_USER) || loggedInUser == null) {
             return EMPTY_VAULT 
        }

        const [result] = await db.query(
            "SELECT * FROM Logins WHERE user_id = ?",
            [loggedInUser.id]
        )

        return result

    } catch (error) {
        console.error(error)
        return EMPTY_VAULT
    }
}

export default getVault
