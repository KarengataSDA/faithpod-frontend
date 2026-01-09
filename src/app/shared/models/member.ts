
import { PopulationGroup } from './population-group';
import { Prayercell } from './prayercell';
import { Contribution } from './collection';
import { Membership } from './membership';
import { Role } from './role';

export interface Member {
  id: number;
  membership_number: number
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  role: Role;
  population_group: PopulationGroup;
  prayercell: Prayercell;
  membershiptype: Membership
  contributions: Contribution[];
  tenant_id?: string;

}

export interface Gender {
  male: string
  female: string
}

