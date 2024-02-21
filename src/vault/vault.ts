import express from 'express'

const vault = express.Router()

// get all logins without any sensitive data 
vault.post('/:userid', (req, res) => {
    res.send("get all logins")
})

// get the sensitive data about one login
vault.post('/:userid/:loginid', (req, res) => {
    res.send("get single login") 
})

// update a single login
vault.post('/:userid/update/:loginid', (req, res) => {
    res.send("update single login") 
})

// create a single new login
vault.post('/:userid/new', (req, res) => {
    res.send("new login") 
})

// delet a single login
vault.post('/:userid/delete/:loginid', (req, res) => {
    res.send("delete login") 
})

export default vault
