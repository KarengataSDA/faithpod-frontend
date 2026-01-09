import { Member } from "./member"

export interface PopulationGroup {
    id: number
    name: string
    users: Member[]
}