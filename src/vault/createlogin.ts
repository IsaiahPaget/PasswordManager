import TLogin from "types/TLogin";
import TUser from "../types/TUser";
import IDb from "IDb";

async function createlogin(user: TUser, login: TLogin, db: IDb) {
    if (user.id == -1 || user.id == null) {
        return -1
    } 
    if (user.firstName == "" || user.firstName == null) {
        return -1
    } 
    if (user.lastName == "" || user.lastName == null) {
        return -1
    } 
    if (user.masterPassword == "" || user.masterPassword == null) {
        return -1
    } 
    if (user.email == "" || user.email == null) {
        return -1
    }
    if (login.userId == -1 || login.userId == null) {
        return -1
    }
    if (login.loginPassword == "" || login.loginPassword == null) {
        return -1
    }
    if (login.loginUrl == "" || login.loginUrl == null) {
        return -1
    }
    if (login.loginName == "" || login.loginName == null) {
        return -1
    }
    
}

export default createlogin
