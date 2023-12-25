import { TUser } from '../../types/TUser';
import getQuery from '../helpers/getQuery';

export default async function doesUserExist(email: string): Promise<boolean> {
    // TODO: Id is untrusted and should be sanitized
    if (email == null) {
        throw new Error("No such user");
    }
    try {
        const data = await getQuery("SELECT id FROM Users WHERE email = ?", [email]) as TUser[]
        if (data[0].id == null) {
            return false
        }
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}
