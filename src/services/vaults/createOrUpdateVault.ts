import { TVault } from "../../types/TVault";
import Database from "../db"

export default async function createOrUpdateVault(vaultObj: TVault) {
    const db = Database.getConnection()
    
    const { vault } = vaultObj
    
    console.log(vault)
}