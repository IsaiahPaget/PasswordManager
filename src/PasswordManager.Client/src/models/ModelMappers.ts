import type { loginDto } from "./logins/loginDto";
import type { NewLoginRequestDto } from "./logins/NewLoginRequestDto";
import type { UpdateLoginRequest } from "./logins/UpdateLoginRequest";

export function ToNewLoginRequest(login: loginDto): NewLoginRequestDto {
    return {
        name: login.name,
        url: login.url,
        username: login.username,
        password: login.password,
        notes: login.notes
    } as NewLoginRequestDto
}

export function ToUpdateLoginRequest(login: loginDto): UpdateLoginRequest {
    return {
        id: login.id,
        name: login.name,
        url: login.url,
        username: login.username,
        password: login.password,
        notes: login.notes
    } as UpdateLoginRequest
} 