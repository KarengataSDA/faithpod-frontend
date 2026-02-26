import { Membership } from "./membership";
import { PopulationGroup } from "./population-group";
import { Prayercell } from "./prayercell";
import { Contribution } from "./collection";
import { Role } from "./role";

export interface User {
    id: number;
    membership_number: string
    first_name: string
    middle_name?: string
    last_name: string
    full_name?: string
    email: string
    phone_number: string
    date_of_birth: string
    gender: string
    email_verified_at?: string
    role?: Role
    roles?: string[]
    permissions?: string[]
    prayercell?: Prayercell
    membershiptype?: Membership
    membership_type?: { id: number; name: string }
    population_group?: PopulationGroup
    contributions?: Contribution[]
    tenant_id?: string
    avatar_url?: string
    thumb_url?: string
}


