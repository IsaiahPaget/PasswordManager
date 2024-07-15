import type { LoginResponeDto } from "@/models/Account/LoginResponseDto"
import type { LoginUserDto } from "@/models/Account/LoginUserDto"
import type { RegisterUserDto } from "@/models/Account/RegisterUserDto"

export async function RegisterUser(user: RegisterUserDto) {
    // const result = await fetch(`${process.env.BASE_API_URL}/register`, {
    //     method: 'POST',
    //     headers: {
    //         "accept": "*/*",
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(user)
    // })

    // const loginResponse: LoginResponeDto = await result.json()
    // return loginResponse
    throw new Error("Not implemented")
}

export async function LoginUser(user: LoginUserDto): Promise<LoginResponeDto | undefined> {
    const result = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: {
            "accept": "*/*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    })

    const loginResponse = await result.json()
    const login: LoginResponeDto = {
        Username: loginResponse.username,
        Email: loginResponse.email,
        Token: loginResponse.token,
    }

    localStorage.setItem("JWTSessionToken", login.Token)

    return login
}