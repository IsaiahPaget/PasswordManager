import getLogin from "../../logins/getLogin"
import { TLogin } from "types/TLogin"
 
export default async function isUpdatedLogin(loginReq: TLogin): Promise<Boolean | undefined> {
    
    const reqId = loginReq.id?.toString()
    if (reqId == null) {
        return false
    }

    const login = await getLogin(reqId)
    if (login == null) {
        return false
    }
    // TODO: this is sensitive to the order of the properties in the obj
    if (JSON.stringify(login) !== JSON.stringify(loginReq)) {
        console.log(login)
        console.log(loginReq)
        return true
    }

    return true
}
