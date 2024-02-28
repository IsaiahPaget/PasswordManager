import TUser from "types/TUser";

function userValidate(user: TUser): boolean {
    if (user.id < 0 || user.id == null) {
        return false
    }
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

export default userValidate
