import deleteByIdQuery from '../helpers/deleteByIdQuery'
export default async function deletLogin(id: string): Promise<string | undefined> {
    // TODO: is is untrusted and should be sanitized
    if (id == null) {
        throw new Error("No such login");
    }
    
    try {
        const data = await deleteByIdQuery("DELETE FROM Logins WHERE id = ?", id)
        return data
    } catch (error) {
        console.error(error)
        return undefined
    }
}
