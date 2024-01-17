export interface Permission {
  id: number
  name: string
}

export interface PermissionResponse {
  permissions: Permission[]
}

export interface EditPermission {
  permission: string
}