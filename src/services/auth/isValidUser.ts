import { TUser } from "types/TUser";
import bcrypt from 'bcrypt'
import Database from "services/db";
import getQuery from "../../services/helpers/getQuery";
import hash from "../../crypto/hash";

export default async function isValidUser(loginReq: TUser) {
    try {
        console.log("loginReq email: " + JSON.stringify(loginReq))
        const hashedPassword = await getQuery("SELECT master_password FROM Users WHERE email = ?", [loginReq.email, loginReq.last_name])
        const hashMasterPassword = hashedPassword[0].master_password

        const isMatch = await bcrypt.compare(loginReq.master_password, hashMasterPassword)
        if (isMatch === true) {
            return true
        }
        return false 
    } catch (error) {
        console.error(error)
        return false
    }
}
