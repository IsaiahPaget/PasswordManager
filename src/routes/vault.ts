import express from 'express'
import { TVault } from '../types/TVault'
import createOrUpdateVault from '../services/vaults/createOrUpdateVault'
import getVault from '../services/vaults/getVault'
import isValidUser from '../services/auth/isValidUser'
const vault = express.Router()

/* Create Or Update Vault */
vault.post('/', async (req, res) => {
    try {
        const vault: TVault = req.body
        if (vault.credentials == null) {
            throw new Error("No credentials")
        }
        const isValid = await isValidUser(vault.credentials)
        if (isValid === false) {
            throw new Error("Not a valid user")
        }
        const userId = await createOrUpdateVault(vault) 
        if (userId == null) {
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
