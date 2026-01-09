export interface PaybillTransaction {
    id: number,
    transaction_type: string,
    trans_id: string,
    trans_time: string,
    amount: string, 
    phone_number: string,
    first_name: string,
    middle_name: string, 
    last_name: string, 
    account: string,
    created_at: string,
    update_at: string 
}