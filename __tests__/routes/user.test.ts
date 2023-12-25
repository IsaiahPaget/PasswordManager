import dotenv from 'dotenv'
import axios from 'axios'
import errorHTML from '../constants/errorHTML'

dotenv.config()

async function get(): Promise<any> {
    try {
        const response = await axios({
            method: "get",
            url: "/user",
            baseURL: `http://${process.env.URL}:${process.env.NODE_PORT}/`,
        })
        return response
    } catch (error) {
        return error
    }
}

describe("GET /user", () => {

    it("Should respond 'Not Found'", async () => {
        const axios = await get()
        expect(axios.response.status).toBe(404)
    })
    it("Should be empty object", async () => {
        const axios = await get()
        expect(axios.response.data).toBe(errorHTML)
    })


})

describe("GET /user/:id", () => {

    it("Should be OK", async () => {
        const axios = await get()

    })
})

// TODO: need to implement test for all the ways one could throw params at this request
