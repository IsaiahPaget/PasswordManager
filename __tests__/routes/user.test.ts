import dotenv from 'dotenv'
import axios from 'axios'
import { emptyObject } from '@jest/expect-utils'

dotenv.config()

describe("GET /user", () => {

    it("Should respond 'Not Found'", async () => {
        const response = await axios({
            method: "get",
            url: "/user",
            baseURL: `http://${process.env.URL}:${process.env.NODE_PORT}/`,
        })
        expect(response.status).toBe(404)
    })
})

// TODO: need to implement test for all the ways one could throw params at this request