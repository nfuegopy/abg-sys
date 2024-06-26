// Interface para ser utilizada dentro de clientes para admininstrar los clientes del abogado o usuario 
export interface DefendantsInterface {
    id?: string;
    ci_ruc: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    address: string;
    created_at: Date;
    updated_at: Date;
    }