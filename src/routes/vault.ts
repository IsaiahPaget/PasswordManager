import express from 'express'
import { TVault } from '../types/TVault'
import createOrUpdateVault from 'services/vaults/createOrUpdateVault'

const vault = express.Router()

/* Create Or Update Vault */
vault.post('/', async (req, res) => {
    try {
        const vault: TVault = req.body
        const vaultId = await createOrUpdateVault(vault) 
        if (vaultId == null) {
            throw new Error("Could not Create Or Update Vault");
        }
        res.statusCode = 201
        res.send("Success")
    } catch (error) {
        res.statusCode = 400
        console.error(error)
        res.send("Invalid Request")
    }
})

export default vault