import { TUser } from 'types/TUser';
import createQuery from '../helpers/createQuery'

export default async function createUser(newUser: TUser) {
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

    try {
        const userId = await createQuery("INSERT INTO Users (last_name, first_name, master_password, email) VALUES ( ? , ?, ?, ?)", [
            first_name, 
            last_name, 
            master_password, 
            email
        ])
        return userId
    } catch (error) {
        console.error(error)
    }
}

