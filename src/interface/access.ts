import { Role } from "./role"
import { User } from "./user"

export interface Access extends User {
  roles: Role[]
}

export interface AccessResponse {
  users: Access[]
}

export interface EditAccess {
  roles: string
}