import getByIdQuery from '../helpers/getByIdQuery';

export default async function getUser(id: string) {
    // TODO: Id is untrusted and should be sanitized
    if (id == null) {
        throw new Error("No such user");
    }
    try {
        const data = await getByIdQuery("SELECT * FROM Users WHERE id = ?", id)
        return data
    } catch (error) {
        console.error(error)
    }
}

