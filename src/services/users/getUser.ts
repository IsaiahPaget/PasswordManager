import { TUser } from '../../types/TUser';
import getQuery from '../helpers/getQuery';

export default async function getUser(email: string): Promise<TUser | undefined> {
    // TODO: Id is untrusted and should be sanitized
    if (email == null) {
        throw new Error("No such user");
    }
    try {
        const data = await getQuery("SELECT * FROM Users WHERE email = ?", [email]) as TUser[]
        return data[0]
    } catch (error) {
        console.error(error)
        return undefined
    }
}

