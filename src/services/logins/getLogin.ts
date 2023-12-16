import getByIdQuery from "../helpers/getByIdQuery";

export default async function getLogin(id: string) {
    // TODO: id is untrusted and should be sanitized
    if (id == null) {
        throw new Error("No such login");
    }
    
    try {
        const data = await getByIdQuery("SELECT * FROM Logins WHERE id = ?", id)
        return data
    } catch (error) {
        console.error(error) 
    }
}