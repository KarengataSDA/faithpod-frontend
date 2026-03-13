export interface Message {
    id: number;
    subject?: string;
    message: string;
    channel: 'sms' | 'email' | 'both';
    recipient_type: 'all' | 'group' | 'prayercell' | 'individual';
    recipient_ids?: number[];
    total_recipients: number;
    successful_sms: number;
    successful_emails: number;
    failed_sms: number;
    failed_emails: number;
    sent_by: number;
    sent_at: string;
    sender?: { id: number; first_name: string; last_name: string };
    created_at: string;
    updated_at?: string;
}

export interface RecipientOptions {
    total_members: number;
    groups: { id: number; name: string }[];
    prayercells: { id: number; name: string }[];
}

export interface SendMessageRequest {
    subject?: string;
    message: string;
    channel: 'sms' | 'email' | 'both';
    recipient_type: 'all' | 'group' | 'prayercell' | 'individual';
    recipient_ids?: number[];
}

export interface SendMessageResponse {
    status: string;
    message: string;
    message_id: number;
    total_recipients: number;
    results: {
        successful_sms: number;
        failed_sms: number;
        successful_emails: number;
        failed_emails: number;
    };
}

export interface BirthdayRecipient {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    date_of_birth: string;
}

export interface BirthdayWish extends Message {
    recipients?: BirthdayRecipient[];
}

export interface BirthdayWishesResponse {
    summary: {
        total_wishes_sent: number;
        total_recipients: number;
        total_sms_sent: number;
        total_emails_sent: number;
    };
    birthday_wishes: BirthdayWish[];
}
