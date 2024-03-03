import TUser from '../../src/types/TUser'
import register from '../../src/auth/register'
import MockDB from '../constants/mockDb'
import { INVALID_USER_ID } from '../../src/types/errors'
describe("register", () => {
    const mockdb = new MockDB()

    it.todo("should notify user if they try to register with an email that already exists")

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
    test("Returns -1 when it fails", async () => {
        const userid = await register(
            {} as TUser, 
            mockdb
        )
        expect(userid).toEqual(INVALID_USER_ID)
    })
})
