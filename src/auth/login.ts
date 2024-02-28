import TNewUser from "types/TNewUser";
import newUserValidate from "./newUserValidate";
import IDb from "IDb";
import TUser from "types/TUser";

async function login(user: TNewUser, db: IDb): Promise<TUser> {
    const userObj = {} as TUser

    const isValidUser = newUserValidate(user)

    if (!isValidUser) {
        return {} as TUser
    }

    try {
        const result = await db.query(
            "SELECT id, last_name, first_name, email, account_create_on FROM Users WHERE email = ?, last_name = ?, first_name = ?, master_password = ?",
            [user.email, user.lastName, user.firstName, user.masterPassword]
        )

        console.log(result)
        return userObj
    } catch (error) {
        console.error(error)
        return {} as TUser
    }

    return userObj
}

export default login
