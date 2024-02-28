import TLogin from "types/TLogin"

function loginValidate(login: TLogin): boolean {
    if (login.id < 0 || login.id == null) {
        return false
    }
    if (login.userId < 0 || login.userId == null) {
        return false
    }
    if (login.loginPassword == "" || login.loginPassword == null) {
        return false
    }
    if (login.loginUrl == "" || login.loginUrl == null) {
        return false
    }
    if (login.loginName == "" || login.loginName == null) {
        return false
    }
    if (login.loginNotes == "" || login.loginName == null) {
        return false
    }
    return true
}

export default loginValidate
