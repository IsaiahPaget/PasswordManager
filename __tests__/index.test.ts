import app from "../src/app"
import dotenv from 'dotenv'
import axios, { AxiosResponse }from 'axios'

dotenv.config()

async function get(): Promise<AxiosResponse | undefined> {
    try {
        const response = await axios({
            method: "get",
            url: "/",
            baseURL: `http://${process.env.URL}:${process.env.NODE_PORT}/`,
        })
        return response
    } catch (error) {
        console.error(error)
    }
    return undefined
}

describe("Jest Is Working", () => {
    it("Should Pass", async () => {
        expect(1).toEqual(1)
    })
})

describe("GET /", () => {

    it("should respond OK", async () => {
        const response = await get()
        expect(response?.status).toBe(200)
    })
})