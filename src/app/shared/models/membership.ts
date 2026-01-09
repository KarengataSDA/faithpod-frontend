import { User } from "./user"


export interface Membership {
    id: number 
    name: string
    users: User[]
}

export interface MembershipCount {
    member: string 
    sabbath: string 
    visitor: string
}
