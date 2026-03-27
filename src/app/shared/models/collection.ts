import { User } from "./user";


export interface ContributionCategory {
    id: number,
    name: string,
    description: string,
    archived: boolean,
    total_contributions: number
    total_amount: number,
    contributions: Contribution[]
}


export interface Collection {
    id: number
    contribution_date: string;
    total_amount: string;
    status: number;
    contributions: Contribution[]
    
}

export interface CollectionTotal {
    total_amount_collected: number
}

export interface Contribution {
        id: number
        member_id: number | null
        contributiontype_id: number
        contribution_amount: string
        contribution_date: string
        created_at: string
        status: number | string
        source: 'mpesa' | 'manual'
        contributor_name: string | null
        contributor_phone: string | null
        contributor_email: string | null
        mpesa_reference: string | null
        recorded_by: number | null
        notes: string | null
        email_sent: number
        sms_sent: number
        notification_error: string | null
        user?: User
        contribution_type?: ContributionCategory
}
