import { TVault } from "../../types/TVault";
import storeVault from "./storeVault";

export default async function createOrUpdateVault(vaultObj: TVault) {
    const { vault } = vaultObj
    const foo = storeVault(vault)    
    console.log(vault)
}