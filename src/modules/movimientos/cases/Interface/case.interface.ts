export interface CaseInterface {
    id?: string;
    case_number: string;
    court_id: string;
    secretary_id: string;
    start_date: Date;
    claim_amount: number;
    impulse_description?: string;
    current_status?: string;
    observation?: string;
    user_id: number;
    created_at: Date;
    updated_at: Date;
  }