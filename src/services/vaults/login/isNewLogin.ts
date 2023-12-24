import { TLogin } from "types/TLogin";
import getLogin from "../../logins/getLogin";

export default function isNewLogin(loginReq: TLogin): Boolean | undefined {

    // TODO: make sure that one cannot add empty fields
    const reqId = loginReq.id?.toString()
    if (reqId == null) {
        return true
    }
    // const values = Object.entries(loginReq)
    // let isEmpty = false
    // values.forEach(element => {
    //     if (element[0] !== "id" && element[1] == null) {
    //         isEmpty = true
    //         return 
    //     } 
    //     isEmpty = false
    // });

    return false
}

