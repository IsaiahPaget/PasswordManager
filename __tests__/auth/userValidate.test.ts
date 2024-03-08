import userValidate from '../../src/auth/userValidate'
import TUser from '../../src/types/TUser'
import {
    userIsInvalidId,
    userIsValid, 
    userMissingEmail, 
    userMissingFirstName, 
    userMissingLastName, 
    userMissingMasterPassword 
} from '../constants/testUser'

describe("userValidate", () => {

    test("Returns false if first name is missing", async () => {
        const isValid = await userValidate(userMissingFirstName)
        expect(isValid).toBe(false)
    })

    test("Returns false if last name is missing", async () => {
        const isValid = await userValidate(userMissingLastName)
        expect(isValid).toBe(false)
    })

    test("Returns false if email is missing", async () => {
        const isValid = await userValidate(userMissingEmail)
        expect(isValid).toBe(false)
    })
    
    test("Returns false if master password is missing", async () => {
        const isValid = await userValidate(userMissingMasterPassword)
        expect(isValid).toBe(false)
    })

    test("Returns true when all fields are present", async () => {
        const isValid = await userValidate(userIsValid)
        expect(isValid).toBe(true)
    })

    test("Returns false when id is missing", async () => {
        const isValid = await userValidate(userIsInvalidId)
        expect(isValid).toBe(false)
    })
    test("Does not expect empty objects", async () => {
        const isValid = await userValidate({} as TUser)
        expect(isValid).toBe(false)
    })
})
