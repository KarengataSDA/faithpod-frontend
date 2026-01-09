import { Permission } from "../../components/pages/role/permission"

export interface Role {
    id: number
    name: string
    permissions?: Permission[]
}