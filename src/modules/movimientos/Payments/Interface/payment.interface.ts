export interface PaymentInterface {
    id?: string;
    case_id: string;
    amount: number;
    payment_date: Date;
    payment_type: string;
    payment_status: string;
    description?: string;
    created_at: Date;
    updated_at: Date;
  }