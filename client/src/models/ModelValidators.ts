import type { NewLoginRequestDto } from "./logins/NewLoginRequestDto"

export type IsValid = {
    isValid: boolean,
    message: string
}
export type NewLoginRequestValidation = {
    name: IsValid
    url: IsValid
    username: IsValid
    password: IsValid
}