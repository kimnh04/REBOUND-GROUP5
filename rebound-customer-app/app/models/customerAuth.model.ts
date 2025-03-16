export interface Customer {
    customer_id?: string;             // customer_id field from schema
    Customer_ID?: string;            // Customer_ID from schema
    fullName: string;                // customer_name -> fullName (updated to match frontend expectations)
    email: string;                   // customer_email -> email
    phoneNumber: string;             // customer_phone -> phoneNumber
    address: string;                 // customer_address -> address
    sex: 'Male' | 'Female';          // customer_gender -> sex
    password: string;                // password (keep this for consistency, though it's not in the schema directly)
    createdAt?: Date;                // customer_registration_date -> createdAt
    updatedAt?: Date;                // customer_updated_at (if you want to track updates)
    dob: Date | null;                       // customer_dob -> dob
    registrationDate: Date;          // customer_registration_date -> registrationDate
    customerType: string;            // customer_type -> customerType
}

export interface CustomerAuthResponse {
    token?: string;
    customer?: Customer;
    message?: string;
}

export interface CustomerPasswordResetResponse {
    message: string;
    success: boolean;
}