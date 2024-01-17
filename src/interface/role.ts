import { Permission } from "./permission"

export interface Role {
  id: number
  name: string
  permissions: Permission[]
}

export interface RoleResponse {
  roles: Role[]
}

export interface EditRole {
  role: string
  permissions: string[]
}