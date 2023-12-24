import { TLogin } from "../../types/TLogin";
import getByIdQuery from "../helpers/getByIdQuery";

export default async function getLogin(idReq: string): Promise<TLogin | undefined> {
    // TODO: id is untrusted and should be sanitized
    if (idReq == null) {
        throw new Error("No such login");
    }
    
    try {
        const results = await getByIdQuery("SELECT * FROM Logins WHERE id = ?", idReq) as TLogin[]
        const login = results[0]
        const data = [login.id, login.user_id, login.Logins_name, login.Logins_password, login.Logins_url, login.Logins_notes]
        data.forEach(element => {
           if (element == null) {
                throw new Error("Could not fetch");
           } 
        });
        return login
    } catch (error) {
        console.error(error) 
        return undefined
    }
}
