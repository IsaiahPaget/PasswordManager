import { TUser } from 'types/TUser';
import createQuery from '../helpers/createQuery'
import hash from '../../crypto/hash';
import doesUserExist from './doesUserExist';

export default async function createUser(newUser: TUser): Promise<string | undefined> {
    // TODO: newUser is untrusted and should be sanitized
    const { first_name, last_name, master_password, email } = newUser
    const newUserValues = [
        first_name, 
        last_name, 
        master_password,
        email
    ]
    newUserValues.forEach(element => {
        if (element == null) {
            throw new Error("param is undefined");
        }
    });
    if (await doesUserExist(email)) {
        throw new Error("user already exists")
    }
    const hashedPassword = await hash(master_password) 

    const currDate = Date.now()
    try {
        const userId = await createQuery("INSERT INTO Users (last_name, first_name, master_password, email, account_created_on) VALUES (?, ?, ?, ?, ?)", [
            first_name, 
            last_name, 
            hashedPassword,
            email,
            currDate
        ])
        return userId
    } catch (error) {
        console.error(error)
        return undefined
    }
}

