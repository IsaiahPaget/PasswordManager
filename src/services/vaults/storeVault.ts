import { TLogin } from '../../types/TLogin'
import isSameLogin from './login/isSameLogin';

export default function storeVault(vaultObj: Array<TLogin>) {
    const vault = vaultObj
    vault.forEach(async login => {
        switch (true) {
            case await isSameLogin(login):
                    console.log("same login")
                break;
            // case await isUpdatedLogin(login):
                
            //     break;
            // case await isNewLogin(login):
                
            //     break;
            // case await isDeletedLogin(login):
                
            //     break;
        
            default:
                break;
        }
    })
}