import MockDB from "../constants/mockDb"
import login from "../../src/auth/login"
import TUser from "../../src/types/TUser"
import TNewUser from "../../src/types/TNewUser"
import { EMPTY_USER } from "../../src/types/errors"
import { newUserIsValid } from "../constants/testLogin"
describe("Login", () => {
    const mock = new MockDB()
    const returnedUser = {} as TUser

    it("should return an entire user object without the masterpassword", async () => {
        const user = await login(
            newUserIsValid,
            mock
        )
        expect(user).toMatchObject(returnedUser)
        expect(user.masterPassword).toBe(undefined)
    })

    it("should return -1 if it fails", async () => {
        const user = await login(
            { } as TNewUser,
            mock
        )
        expect(user).toEqual(EMPTY_USER)
    })
})
