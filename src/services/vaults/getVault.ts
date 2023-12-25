import getLoginsByUserId from "../logins/getLoginsByUserId"

export default async function getVault(userId: number | undefined) {
    if (userId == null) {
        throw new Error("No such vaultId")
    }
    try {
        const logins = await getLoginsByUserId(userId)
        return logins        
    } catch (error) {
        console.error(error) 
        return undefined
    }
}
