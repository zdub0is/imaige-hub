import { UserRoles } from "./roles"

export type user = {
    username: string,
    role: UserRoles,
    notificationsEnabled: boolean,
    isBanned: boolean
}


