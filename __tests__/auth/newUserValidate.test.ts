import newUserValidate from '../../src/auth/newUserValidate'
import TNewUser from '../../src/types/TNewUser'
import { newUserIsValid, newUserMissingEmail, newUserMissingFirstName, newUserMissingLastName, newUserMissingMasterPassword } from '../constants/testUser'

describe("newUserValidate", () => {

    test("Returns false if first name is missing", async () => {
        const isValid = await newUserValidate(newUserMissingFirstName)
        expect(isValid).toBe(false)
    })

    test("Returns false if last name is missing", async () => {
        const isValid = await newUserValidate(newUserMissingLastName)
        expect(isValid).toBe(false)
    })

    test("Returns false if email is missing", async () => {
        const isValid = await newUserValidate(newUserMissingEmail)
        expect(isValid).toBe(false)
    })
    
    test("Returns false if master password is missing", async () => {
        const isValid = await newUserValidate(newUserMissingMasterPassword)
        expect(isValid).toBe(false)
    })

    test("Returns true when all fields are present", async () => {
        const isValid = await newUserValidate(newUserIsValid)
        expect(isValid).toBe(true)
    })

    test("Does not expect empty objects", async () => {
        const isValid = await newUserValidate({} as TNewUser)
        expect(isValid).toBe(false)
    })
})
