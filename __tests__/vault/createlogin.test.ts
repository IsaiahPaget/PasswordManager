import TUser from '../../src/types/TUser'
import TLogin from '../../src/types/TLogin'
import createlogin from '../../src/vault/createlogin'
import MockDB from '../constants/mockDb'

class CreateTestCase {
    user: TUser
    login: TLogin
    expected: any

    constructor(user: TUser, login: TLogin, expected: any) {
        this.user = user
        this.login = login
        this.expected = expect
    }
}

describe("create login", () => {
    const db = new MockDB()
    const errNumber = -1

    const credentialTestCases = [
        new CreateTestCase(
            { } as TUser,
            {
                userId: 1,
                loginName: "whatever",
                loginUrl: "https://whatever.com",
                loginPassword: "789sdfwer2892",
                loginNotes: "this is website"
            },
            errNumber
        ),
        new CreateTestCase(
            {
                firstName: "",
                lastName: "hello",
                masterPassword: "789sdfsdf789",
                email: "mail@mail.com",
            },
            {
                userId: 1,
                loginName: "whatever",
                loginUrl: "https://whatever.com",
                loginPassword: "789sdfwer2892",
                loginNotes: "this is website"
            },
            errNumber
        ),
        new CreateTestCase(
            {
                firstName: "test",
                lastName: "",
                masterPassword: "789sdfsdf789",
                email: "mail@mail.com",
            },
            {
                userId: 1,
                loginName: "whatever",
                loginUrl: "https://whatever.com",
                loginPassword: "789sdfwer2892",
                loginNotes: "this is website"
            },
            errNumber
        ),
        new CreateTestCase(
            {
                firstName: "test",
                lastName: "hello",
                masterPassword: "",
                email: "mail@mail.com",
            },
            {
                userId: 1,
                loginName: "whatever",
                loginUrl: "https://whatever.com",
                loginPassword: "789sdfwer2892",
                loginNotes: "this is website"
            },
            errNumber
        ),
        new CreateTestCase(
            {
                firstName: "test",
                lastName: "hello",
                masterPassword: "789sdfsdf789",
                email: "",
            },
            {
                userId: 1,
                loginName: "whatever",
                loginUrl: "https://whatever.com",
                loginPassword: "789sdfwer2892",
                loginNotes: "this is website"
            },
            errNumber
        )
    ]

    credentialTestCases.forEach(({ user, login, expected }) => {
        it(`should not accept missing ${Object.keys(user).join(', ')}`, async () => {
            const loginId = await createlogin(user, login, db);
            expect(loginId).toBe(expected);
        });
    });

    it("should not accept empty new login", async () => {
        const loginId = await createlogin(
            {
                firstName: "test",
                lastName: "hello",
                masterPassword: "789sdfsdf789",
                email: "mail@mail.com",
            },
            { } as TLogin,
            db
        )
        expect(loginId).toBe(-1)
    })

    it("should not accept userId", async () => {
        const loginId = await createlogin(
            {
                firstName: "test",
                lastName: "hello",
                masterPassword: "789sdfsdf789",
                email: "mail@mail.com",
            },
            {
                userId: NaN,
                loginName: "whatever",
                loginUrl: "https://whatever.com",
                loginPassword: "789sdfwer2892",
                loginNotes: "this is website"
            },
            db
        )
        expect(loginId).toBe(-1)
    })

    it("should not accept loginName", async () => {
        const loginId = await createlogin(
            {
                firstName: "test",
                lastName: "hello",
                masterPassword: "789sdfsdf789",
                email: "mail@mail.com",
            },
            {
                userId: 1,
                loginName: "",
                loginUrl: "https://whatever.com",
                loginPassword: "789sdfwer2892",
                loginNotes: "this is website"
            },
            db
        )
        expect(loginId).toBe(-1)
    })
    it("should not accept loginUrl", async () => {
        const loginId = await createlogin(
            {
                firstName: "test",
                lastName: "hello",
                masterPassword: "789sdfsdf789",
                email: "mail@mail.com",
            },
            {
                userId: 1,
                loginName: "whatever",
                loginUrl: "",
                loginPassword: "789sdfwer2892",
                loginNotes: "this is website"
            },
            db
        )
        expect(loginId).toBe(-1)
    })
    it("should not accept loginPassword", async () => {
        const loginId = await createlogin(
            {
                firstName: "test",
                lastName: "hello",
                masterPassword: "789sdfsdf789",
                email: "mail@mail.com",
            },
            {
                userId: 1,
                loginName: "whatever",
                loginUrl: "https://whatever.com",
                loginPassword: "",
                loginNotes: "this is website"
            },
            db
        )
        expect(loginId).toBe(-1)
    })

    it("should return a loginid", () => {
        
    })
})
