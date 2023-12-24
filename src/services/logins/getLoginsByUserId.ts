import getByIdQuery from "../helpers/getByIdQuery";
import { TLogin } from "../../types/TLogin"
export default async function getLoginsByUserId(userId: string): Promise<TLogin[] | undefined> {
    // TODO: userId is untrusted and needs to be sanitizied
    if (userId == null) {
        throw new Error("No such userId");
    }

    console.log(userId)

    try {
        const logins = await getByIdQuery("SELECT * FROM Logins WHERE user_id = ?", userId) as TLogin[]
        console.log(logins)
        logins.forEach(login => {
            if (login == null) {
                throw new Error("Could not fetch")
            } 
        });
        return logins
    } catch (error) {
        console.error(error) 
        return undefined
    }
}
