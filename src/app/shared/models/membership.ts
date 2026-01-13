import { Member } from "./member"


export interface Membership {
    id: number
    name: string
    members: Member[]
}

export interface MembershipCount {
    member: string 
    sabbath: string 
    visitor: string
}
