import { TLogin } from '../../types/TLogin'
import createQuery from '../helpers/createQuery'

export default async function createLogin(newLogin: TLogin): Promise<string | undefined>{
    // TODO: newLogin is untrusted and needs to be sanitized
    const { user_id, Login_name, Login_notes, Login_password, Login_url} = newLogin
    
    const newLoginValues = [
        user_id, Login_name, 
        Login_notes, 
        Login_password, 
        Login_url
    ]

    newLoginValues.forEach(element => {
        if (element == null) {
            throw new Error("Param is undefined");
        }
    });
    
    try {
        const loginId = await createQuery("INSERT INTO Logins (user_id, Logins_name, Logins_url, Logins_password, Logins_notes", [
            user_id,
            Login_name,
            Login_notes,
            Login_password,
            Login_url
        ])
        return loginId
    } catch (error) {
        console.error(error) 
        return undefined
    }
}