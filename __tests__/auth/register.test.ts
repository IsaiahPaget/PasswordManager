import TUser from '../../src/types/TUser'
import register from '../../src/auth/register'
import MockDB from '../constants/mockDb'
describe("register", () => {
    const mockdb = new MockDB()

    test("Returns error if first name is missing", async () => {
        const userid = await register(
            {
                firstName: "",
                lastName: "hello",
                masterPassword: "789sdfsdf789",
                email: "mail@mail.com",
            }, 
            mockdb
        )
        expect(userid).toBe(-1)
    })

    test("Returns error if last name is missing", async () => {
        const userid = await register(
            {
                firstName: "test",
                lastName: "",
                masterPassword: "789sdfsdf789",
                email: "mail@mail.com",
            }, 
            mockdb
        )
        expect(userid).toBe(-1)
    })

    test("Returns error if email is missing", async () => {
        const userid = await register(
            {
                firstName: "test",
                lastName: "hello",
                masterPassword: "789sdfsdf789",
                email: "",
            }, 
            mockdb
        )
        expect(userid).toBe(-1)
    })
    
    test("Returns error if master password is missing", async () => {
        const userid = await register(
            {
                firstName: "test",
                lastName: "hello",
                masterPassword: "",
                email: "mail@mail.com",
            }, 
            mockdb
        )
        expect(userid).toBe(-1)
    })

    test("Does not expect empty objects", async () => {
        const userid = await register({} as TUser, mockdb)
        expect(userid).toBe(-1)
    })

    test("Returns id when successful", async () => {
        const userid = await register(
            {
                firstName: "test",
                lastName: "hello",
                masterPassword: "789sdfsdf789",
                email: "mail@mail.com",
            }, 
            mockdb
        )
        expect(userid).toBeGreaterThanOrEqual(0)
    })
})
