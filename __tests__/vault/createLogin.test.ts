import TUser from '../../src/types/TUser'
import TNewLogin from '../../src/types/TNewLogin'
import createLogin from '../../src/vault/createLogin'
import MockDB from '../constants/mockDb'
import { userIsValid } from '../constants/testUser'
import { INVALID_LOGIN_ID } from '../../src/types/errors'
import { newLoginValid } from '../constants/testLogin'

describe("create login", () => {
    const db = new MockDB()

    it("should return a loginid", async () => {
        const loginId = await createLogin(
            userIsValid,
            newLoginValid,
            db
        )
        expect(loginId).toBeGreaterThanOrEqual(0)
    })

    it("should return -1 if it fails", async () => {
        const loginId = await createLogin(
            {} as TUser,
            {} as TNewLogin,
            db
        )
        expect(loginId).toBe(INVALID_LOGIN_ID)
    })
})
