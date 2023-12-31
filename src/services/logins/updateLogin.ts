import createOrUpdateQuery from "../helpers/createOrUpdateQuery";
import { TLogin } from "../../types/TLogin";

export default async function updateLogin(updatedLogin: TLogin): Promise<string | undefined> {
    // TODO: updatedLogin is untrusted and needs to be sanitized
    const { id, user_id, Logins_name, Logins_notes, Logins_password, Logins_url} = updatedLogin
    
    const updatedLoginValues = [
        id,
        user_id,
        Logins_name, 
        Logins_notes, 
        Logins_password, 
        Logins_url
    ]

    updatedLoginValues.forEach(element => {
        if (element == null) {
            throw new Error("Param is undefined");
        }
    });

    try {
        const loginId = await createOrUpdateQuery("UPDATE Logins SET Logins_name = ?, Logins_url = ?, Logins_password = ?, Logins_notes = ? WHERE id = ?", [
            Logins_name,
            Logins_url,
            Logins_password,
            Logins_notes,
            id
        ]) 
        return loginId
    } catch (error) {
        console.error(error)
        return undefined
    }
}
