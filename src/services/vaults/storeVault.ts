import { TLogin } from '../../types/TLogin'
import isSameLogin from './login/isSameLogin';
import isUpdatedLogin from './login/isUpdatedLogin';
import isNewLogin from './login/isNewLogin';
import createLogin from '../logins/createLogin';
import updateLogin from '../logins/updateLogin';

export default function storeVault(vaultObj: Array<TLogin>) {
    try {
        const vault = vaultObj
        vault.forEach(async login => {
            switch (true) {
                case await isSameLogin(login):
                    console.log("same login")
                    break;
                case await isUpdatedLogin(login):
                    console.log("updated login")  
                    await updateLogin(login)
                    break;
                case isNewLogin(login):
                    console.log("new login") 
                    await createLogin(login)     
                    break;
                default:
                    throw new Error("Invalid object configuration for login: " + login.id)
                    break;
            }
        })
        return vault[0].user_id
    } catch (error) {
        console.error(error)
        return undefined     
    }
}
