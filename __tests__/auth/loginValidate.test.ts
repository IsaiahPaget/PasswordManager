import TLogin from "../../src/types/TLogin"
import loginValidate from "../../src/auth/loginValidate"
describe("loginValidate", () => {

    it("should return false if id is missing", () => {
        const isValid = loginValidate(
            {
                id: -1,
                userId: 3,
                loginPassword: "2342sdfsdf",
                loginUrl: "https://whatever.com",
                loginName: "whatever",
                loginNotes: "a note"
            }
        )
        expect(isValid).toBe(false)
    })

    it("should return false if userId is missing", () => {
        const isValid = loginValidate(
            {
                id: 1,
                userId: -1,
                loginPassword: "2342sdfsdf",
                loginUrl: "https://whatever.com",
                loginName: "whatever",
                loginNotes: "a note"
            }
        )
        expect(isValid).toBe(false)
    })

    it("should return false if loginPassword is missing", () => {
        const isValid = loginValidate(
            {
                id: 1,
                userId: 3,
                loginPassword: "",
                loginUrl: "https://whatever.com",
                loginName: "whatever",
                loginNotes: "a note"
            }
        )
        expect(isValid).toBe(false)
    })

    it("should return false if loginUrl is missing", () => {
        const isValid = loginValidate(
            {
                id: 1,
                userId: 3,
                loginPassword: "2342sdfsdf",
                loginUrl: "",
                loginName: "whatever",
                loginNotes: "a note"
            }
        )
        expect(isValid).toBe(false)
    })

    it("should return false if loginName is missing", () => {
        const isValid = loginValidate(
            {
                id: 1,
                userId: 3,
                loginPassword: "2342sdfsdf",
                loginUrl: "https://whatever.com",
                loginName: "",
                loginNotes: "a note"
            }
        )
        expect(isValid).toBe(false)
    })

    it("should return false empty object is missing", () => {
        const isValid = loginValidate({} as TLogin)
        expect(isValid).toBe(false)
    })
})
