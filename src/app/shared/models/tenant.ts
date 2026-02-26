export interface Tenant {
  id: string;
  name?: string;
  email?: string;
  created_at?: string;
  tenancy_db_name?: string;
  domains?: Array<{ id: number; domain: string }>;
  logo_url?: string;
  logo_thumb_url?: string;
  banner_url?: string;
  banner_medium_url?: string;
}
