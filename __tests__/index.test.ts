import app from "../src/app"
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

describe("Jest Is Working", () => {
    it("Should Pass", async () => {
        expect(1).toEqual(1)
    })
})

describe("GET /", () => {

    it("should respond OK", async () => {
        const response = await axios({
            method: "get",
            url: "/",
            baseURL: `http://${process.env.URL}:${process.env.NODE_PORT}/`,
        })
        expect(response.status).toBe(200)
    })
})