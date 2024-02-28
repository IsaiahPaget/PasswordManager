import userValidate from '../../src/auth/userValidate'
import TUser from '../../src/types/TUser'

describe("userValidate", () => {

    test("Returns false if first name is missing", async () => {
        const isValid = await userValidate(
            {
                id: 1,
                firstName: "",
                lastName: "hello",
                masterPassword: "789sdfsdf789",
                email: "mail@mail.com",
            }, 
        )
        expect(isValid).toBe(false)
    })

    test("Returns false if last name is missing", async () => {
        const isValid = await userValidate(
            {
                id: 1,
                firstName: "test",
                lastName: "",
                masterPassword: "789sdfsdf789",
                email: "mail@mail.com",
            }, 
        )
        expect(isValid).toBe(false)
    })

    test("Returns false if email is missing", async () => {
        const isValid = await userValidate(
            {
                id: 1,
                firstName: "test",
                lastName: "hello",
                masterPassword: "789sdfsdf789",
                email: "",
            }, 
        )
        expect(isValid).toBe(false)
    })
    
    test("Returns false if master password is missing", async () => {
        const isValid = await userValidate(
            {
                id: 1,
                firstName: "test",
                lastName: "hello",
                masterPassword: "",
                email: "mail@mail.com",
            }, 
        )
        expect(isValid).toBe(false)
    })

    test("Returns true when all fields are present", async () => {
        const isValid = await userValidate(
            {
                id: 1,
                firstName: "test",
                lastName: "hello",
                masterPassword: "789sdfsdf789",
                email: "mail@mail.com",
            }, 
        )
        expect(isValid).toBe(true)
    })

    test("Returns false when id is missing", async () => {
        const isValid = await userValidate(
            {
                id: -1,
                firstName: "test",
                lastName: "hello",
                masterPassword: "789sdfsdf789",
                email: "mail@mail.com",
            }, 
        )
        expect(isValid).toBe(false)
    })
    test("Does not expect empty objects", async () => {
        const isValid = await userValidate({} as TUser)
        expect(isValid).toBe(false)
    })
})
