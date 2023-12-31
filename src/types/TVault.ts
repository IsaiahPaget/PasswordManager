import { TLogin } from "./TLogin"
import { TUser } from "./TUser"

export type TVault = {
    credentials?: TUser,
    vault: [TLogin]
}
