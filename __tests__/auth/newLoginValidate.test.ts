import TNewLogin from "../../src/types/TNewLogin"
import newLoginValidate from "../../src/auth/newLoginValidate"
import { newLoginInvalidUserId, newLoginMissingName, newLoginMissingPassword, newLoginMissingUrl } from "../constants/testLogin"
describe("newLoginValidate", () => {

    it("should return false if loginPassword is missing", () => {
        const isValid = newLoginValidate(newLoginMissingPassword)
        expect(isValid).toBe(false)
    })

    it("should return false if loginUrl is missing", () => {
        const isValid = newLoginValidate(newLoginMissingUrl)
        expect(isValid).toBe(false)
    })

    it("should return false if loginName is missing", () => {
        const isValid = newLoginValidate(newLoginMissingName)
        expect(isValid).toBe(false)
    })

    it("should return false empty object is missing", () => {
        const isValid = newLoginValidate({} as TNewLogin)
        expect(isValid).toBe(false)
    })
})
