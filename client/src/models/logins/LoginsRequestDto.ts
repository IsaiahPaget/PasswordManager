import type { loginDto } from "./loginDto"

export type LoginsRequestDto = {
    logins: loginDto[],
    rowCount: number
}