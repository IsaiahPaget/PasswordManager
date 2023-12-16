import getLogin from "../../logins/getLogin";
import { TLogin } from "types/TLogin";

export default async function isSameLogin(loginReq: TLogin): Promise<Boolean | undefined> {

    const reqId = loginReq.id?.toString()
    if (reqId == null) {
        return false
    }

    const login = await getLogin(reqId)
    if (login == null) {
        return false
    }
    
    if (JSON.stringify(login) !== JSON.stringify(loginReq)) {
        console.log(login)
        console.log(loginReq)
        return false
    }
    
    return true
}