import hash from '../crypto/hash';
import express from 'express'

const crypto = express.Router();

/* GET users. */
crypto.get('/:text', async function (req, res) {
    try {
        res.statusCode = 200
        hash(req.params.text)
        res.json("success");
    } catch (err) {
        console.error(err);
        res.statusCode = 400
        res.send("Invalid Request")
    }
});

/* POST users. */
crypto.post('/', async function (req, res) {
    try {
        res.statusCode = 200
        res.send("success");
    } catch (err) {
        console.log(err)
        res.statusCode = 400
        res.send("Invalid Request")
    }
});

export default crypto

