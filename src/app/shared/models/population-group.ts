import { Member } from "./member"

export interface PopulationGroup {
    id: number
    name: string
    members_count?: number
    members: Member[]
}