
import { PopulationGroup } from './population-group';
import { Prayercell } from './prayercell';
import { Contribution } from './collection';
import { Membership } from './membership';
import { Role } from './role';

export type MemberStatus =
  | 'self_registered'
  | 'invited'
  | 'pending_review'
  | 'verified'
  | 'rejected'
  | 'suspended';

export interface Paginated<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface MemberAudit {
  id: number;
  member_id: number;
  member?: { id: number; first_name: string; last_name: string } | null;
  changed_by: { id: number; first_name: string; last_name: string } | null;
  old_status: MemberStatus | null;
  new_status: MemberStatus;
  action: string | null;
  reason: string | null;
  metadata: Record<string, any> | null;
  ip_address: string | null;
  created_at: string;
}

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

  // Status lifecycle
  status?: MemberStatus;
  is_owner?: boolean;
  created_by?: number | null;
  verified_by?: number | null;
  verified_at?: string | null;
  rejected_by?: number | null;
  rejected_at?: string | null;
  rejection_reason?: string | null;
  suspended_by?: number | null;
  suspended_at?: string | null;
  suspension_reason?: string | null;
  invite_token?: string | null;
  invite_token_expires_at?: string | null;
  invite_accepted_at?: string | null;
  self_registered_at?: string | null;

  role?: Role;
  roles?: string[];
  population_group?: PopulationGroup;
  prayercell?: Prayercell;
  membership_type?: Membership;
  contributions?: Contribution[];
  tenant_id?: string;
  avatar_url?: string;
  thumb_url?: string;
}

export interface Gender {
  male: string
  female: string
}

/** Returns Bootstrap badge CSS classes for a given member status */
export function statusBadgeClass(status: MemberStatus | undefined): string {
  switch (status) {
    case 'verified':        return 'bg-success-transparent text-success';
    case 'pending_review':  return 'bg-warning-transparent text-warning';
    case 'invited':         return 'bg-primary-transparent text-primary';
    case 'self_registered': return 'bg-info-transparent text-info';
    case 'rejected':        return 'bg-danger-transparent text-danger';
    case 'suspended':       return 'bg-secondary-transparent text-secondary';
    default:                return 'bg-light text-muted';
  }
}

/** Human-readable label for a given member status */
export function statusLabel(status: MemberStatus | undefined): string {
  switch (status) {
    case 'verified':        return 'Verified';
    case 'pending_review':  return 'Pending Review';
    case 'invited':         return 'Invited';
    case 'self_registered': return 'Self Registered';
    case 'rejected':        return 'Rejected';
    case 'suspended':       return 'Suspended';
    default:                return status ?? 'Unknown';
  }
}
