import express from 'express'
import { TVault } from '../types/TVault'
import createOrUpdateVault from '../services/vaults/createOrUpdateVault'
import getVault from '../services/vaults/getVault'
import { parse } from 'path'
const vault = express.Router()

/* Create Or Update Vault */
vault.post('/', async (req, res) => {
    try {
        const vault: TVault = req.body
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

vault.post('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const vault = await getVault(parseInt(id)) 
        if (vault == null) {
            throw new Error("Could not get vault");
        }
        res.statusCode = 200
        res.json(vault)
    } catch (error) {
        res.statusCode = 400
        console.error(error)
        res.send("Invalid Request")
    }
})

export default vault
