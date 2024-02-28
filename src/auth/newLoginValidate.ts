import TNewLogin from "types/TNewLogin"

function newLoginValidate(login: TNewLogin): boolean {
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

export default newLoginValidate
