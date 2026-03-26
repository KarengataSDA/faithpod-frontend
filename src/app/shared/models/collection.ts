import { User } from "./user";


export interface ContributionCategory {
    id: number,
    name: string,
    description: string,
    archived: boolean,
    total_contributions: number
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
        member_id: number
        contributiontype_id: number
        contribution_amount: string
        contribution_date: string
        status: number | string
        email_sent: number
        sms_sent: number
        notification_error: string | null
        user?: User
        contribution_type?: ContributionCategory
}
