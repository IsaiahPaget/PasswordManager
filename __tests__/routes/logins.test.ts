import dotenv from 'dotenv'
import axios, { AxiosResponse } from 'axios'
import { emptyObject } from '@jest/expect-utils'
import { TLogin } from '../../src/types/TLogin'
import { number } from 'yargs'

dotenv.config()

describe("GET /login", () => {

    // TODO: need to implement test for all the ways one could throw params at this request

    it("Should respond 'Not Found'", async () => {
        let response: AxiosResponse
        response = await axios({
            method: "get",
            url: "/login",
            baseURL: `http://${process.env.URL}:${process.env.NODE_PORT}/`,
        })
        expect(response.status).toBe(404)
    })
})

describe("GET /login/:id", () => {

    // TODO: need to implement test for all the ways one could throw params at this request

    it("Should respond 'OK'", async () => {

        const response = await axios({
            method: "get",
            url: "/login/1",
            baseURL: `http://${process.env.URL}:${process.env.NODE_PORT}/`,
        })
        expect(response.status).toBe(200)
    })

    it("Should respond with TLogin object", async () => {

        const response = await axios({
            method: "get",
            url: "/login/1",
            baseURL: `http://${process.env.URL}:${process.env.NODE_PORT}/`,
        })
        const login: TLogin = response.data            
        
        expect(login.userId).toBeGreaterThanOrEqual(0)
    })
})