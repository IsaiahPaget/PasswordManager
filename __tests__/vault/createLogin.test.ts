import TUser from '../../src/types/TUser'
import TNewLogin from '../../src/types/TNewLogin'
import createLogin from '../../src/vault/createLogin'
import MockDB from '../constants/mockDb'
import { userIsValid } from '../constants/testLogin'

describe("create login", () => {
    const db = new MockDB()

    it("should return a loginid", async () => {
        const loginId = await createLogin(
            userIsValid,
            {

            },
            db
        )
    })

    it("should return -1 if it fails", async () => {
        const loginId = await createLogin(
            {} as TUser,
            {} as TNewLogin,
            db
        )
    })
})
