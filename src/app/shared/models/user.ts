import { Membership } from "./membership";
import { PopulationGroup } from "./population-group";
import { Prayercell } from "./prayercell";
import { Contribution } from "./collection";
import { Role } from "./role";

export interface User {
    id: number;
    membership_number: string
    first_name: string 
    middle_name: string 
    last_name: string
    email: string 
    phone_number: string
    date_of_birth: string
    gender: string
    role: Role
    prayercell: Prayercell
    membershiptype: Membership
    population_group: PopulationGroup
    contributions: Contribution[]
    
}


