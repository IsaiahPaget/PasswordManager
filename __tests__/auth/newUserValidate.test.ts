import newUserValidate from '../../src/auth/newUserValidate'
import TNewUser from '../../src/types/TNewUser'

describe("newUserValidate", () => {

    test("Returns false if first name is missing", async () => {
        const isValid = await newUserValidate(
            {
                firstName: "",
                lastName: "hello",
                masterPassword: "789sdfsdf789",
                email: "mail@mail.com",
            }, 
        )
        expect(isValid).toBe(false)
    })

    test("Returns false if last name is missing", async () => {
        const isValid = await newUserValidate(
            {
                firstName: "test",
                lastName: "",
                masterPassword: "789sdfsdf789",
                email: "mail@mail.com",
            }, 
        )
        expect(isValid).toBe(false)
    })

    test("Returns false if email is missing", async () => {
        const isValid = await newUserValidate(
            {
                firstName: "test",
                lastName: "hello",
                masterPassword: "789sdfsdf789",
                email: "",
            }, 
        )
        expect(isValid).toBe(false)
    })
    
    test("Returns false if master password is missing", async () => {
        const isValid = await newUserValidate(
            {
                firstName: "test",
                lastName: "hello",
                masterPassword: "",
                email: "mail@mail.com",
            }, 
        )
        expect(isValid).toBe(false)
    })

    test("Returns true when all fields are present", async () => {
        const isValid = await newUserValidate(
            {
                firstName: "test",
                lastName: "hello",
                masterPassword: "789sdfsdf789",
                email: "mail@mail.com",
            }, 
        )
        expect(isValid).toBe(true)
    })

    test("Does not expect empty objects", async () => {
        const isValid = await newUserValidate({} as TNewUser)
        expect(isValid).toBe(false)
    })
})
