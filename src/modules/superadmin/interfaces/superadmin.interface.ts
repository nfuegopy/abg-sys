// src/superadmin/interfaces/superadmin.interface.ts
export interface SuperAdmin {
    id?: string;
    name: string;
    email: string;
    password: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
  }
  