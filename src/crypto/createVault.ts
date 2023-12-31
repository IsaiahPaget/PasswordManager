import crypto from "crypto";
import { TVault } from "types/TVault";

export default function encryptVault(vault: TVault, key: string) {
    const encVault = new Object as TVault
    
    let algorithm = 'aes256'

    const cipher = crypto.createCipheriv(algorithm, key, null)
}
