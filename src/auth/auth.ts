import express from 'express'

const auth = express.Router()

auth.post('/register', (req, res) => {
    res.send("register")
})

auth.post('/login', (req, res) => {
    res.statusCode = 201 
    res.send("login") 
})

export default auth
