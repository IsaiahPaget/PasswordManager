import express from 'express'
import { TVault } from '../types/TVault'
import createOrUpdateVault from '../services/Vaults/createOrUpdateVault'

const vault = express.Router()

/* Create Or Update Vault */
vault.post('/', async (req, res) => {
    try {
        const vault: TVault = req.body
        const vaultId = await createOrUpdateVault(vault) 
        if (vaultId == null) {
            res.statusCode = 400
            res.send("Invalid Request")
        }
        res.statusCode = 201
        res.send("Success")
    } catch (error) {
        res.statusCode = 400
        res.send("Invalid Request")
    }
})

export default vault