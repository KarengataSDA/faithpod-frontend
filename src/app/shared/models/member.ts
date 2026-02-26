
import { PopulationGroup } from './population-group';
import { Prayercell } from './prayercell';
import { Contribution } from './collection';
import { Membership } from './membership';
import { Role } from './role';

export interface Member {
  id: number;
  membership_number?: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  full_name?: string;
  email: string;
  phone_number: string;
  date_of_birth?: string;
  gender?: string;
  email_verified_at?: string;
  role?: Role;
  roles?: string[];
  population_group?: PopulationGroup;
  prayercell?: Prayercell;
  membership_type?: Membership;
  //membership_type?: { id: number; name: string };
  contributions?: Contribution[];
  tenant_id?: string;
  avatar_url?: string;
  thumb_url?: string;
}

export interface Gender {
  male: string
  female: string
}

