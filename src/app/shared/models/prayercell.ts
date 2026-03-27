import { Member } from "./member"

export interface Prayercell {
    id: number
    name: string
    members_count?: number
    members: Member[]
}