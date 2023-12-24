import { TUser } from '../../types/TUser';
import getByIdQuery from '../helpers/getByIdQuery';

export default async function getUser(id: string): Promise<TUser | undefined> {
    // TODO: Id is untrusted and should be sanitized
    if (id == null) {
        throw new Error("No such user");
    }
    try {
        const data = await getByIdQuery("SELECT * FROM Users WHERE id = ?", id) as TUser[]
        return data[0]
    } catch (error) {
        console.error(error)
        return undefined
    }
}

