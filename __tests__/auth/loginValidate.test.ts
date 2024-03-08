import TLogin from "../../src/types/TLogin"
import loginValidate from "../../src/auth/loginValidate"
import { loginInvalidId, loginMissingName, loginMissingPassword, loginMissingUrl } from "../constants/testLogin"
describe("loginValidate", () => {

    it("should return false if id is missing", () => {
        const isValid = loginValidate(loginInvalidId)
        expect(isValid).toBe(false)
    })

    it("should return false if userId is missing", () => {
        const isValid = loginValidate(loginInvalidId)
        expect(isValid).toBe(false)
    })

    it("should return false if loginPassword is missing", () => {
        const isValid = loginValidate(loginMissingPassword)
        expect(isValid).toBe(false)
    })

    it("should return false if loginUrl is missing", () => {
        const isValid = loginValidate(loginMissingUrl)
        expect(isValid).toBe(false)
    })

    it("should return false if loginName is missing", () => {
        const isValid = loginValidate(loginMissingName)
        expect(isValid).toBe(false)
    })

    it("should return false empty object is missing", () => {
        const isValid = loginValidate({} as TLogin)
        expect(isValid).toBe(false)
    })
})
