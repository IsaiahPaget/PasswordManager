import TNewUser from "types/TNewUser"

function newUserValidate(user: TNewUser): boolean {
    if (user.firstName == "" || user.firstName == null) {
        return false
    }
    if (user.lastName == "" || user.lastName == null) {
        return false
    }
    if (user.masterPassword == "" || user.masterPassword == null) {
        return false
    }
    if (user.email == "" || user.email == null) {
        return false
    }
    return true
}

export default newUserValidate
