// src/modules/movimientos/CaseHistory/interfaces/case-history.interface.ts

export interface CaseHistoryInterface {
    id?: string;
    case_id: string;
    action_type: string;
    description: string;
    changed_fields: Record<string, unknown>;
    user_id: string;
    timestamp: Date;
  }