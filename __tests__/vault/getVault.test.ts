import getVault from '../../src/vault/getVault'
import MockDb from '../constants/mockDb'
import TNewUser from '../../src/types/TNewUser'
import { newUserIsValid } from '../constants/testUser'
import TVault from '../../src/types/TVault'
describe("getVault", () => {

    const mock = new MockDb()

    // TODO: this test needs to better
    it("should return an array of logins if successful", async () => {
        const vault = await getVault(newUserIsValid, mock)
        expect(vault).toMatchObject({} as TVault)
    })

    it("should return an empty array of loggins if unsuccessful", async () => {
        const vault = await getVault({} as TNewUser, mock)
        expect(vault).toMatchObject({} as TVault)
    })

})
