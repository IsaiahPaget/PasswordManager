import MockDB from "../constants/mockDb"
import login from "../../src/auth/login"
import TUser from "../../src/types/TUser"
import TNewUser from "../../src/types/TNewUser"
describe("Login", () => {
    const mock = new MockDB()
    const returnedUser = {} as TUser

    it("should return an entire user object without the masterpassword", async () => {
        const user = await login(
            {
                lastName: "lastname",
                firstName: "lastname",
                masterPassword: "78978wefsdrfsd",
                email: "mail@mail.com",
            },
            mock
        )
        expect(user).toMatchObject(returnedUser)
        expect(user.masterPassword).toBe("")
    })

    it("should return -1 if it fails", async () => {
        const user = await login(
            { } as TNewUser,
            mock
        )
        expect(user).toEqual({})
    })
})
