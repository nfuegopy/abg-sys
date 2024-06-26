// Interface para ser utilizada dentro de clientes para admininstrar los clientes del abogado o usuario 
export interface CourtsInterface {
    id?: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    created_at: Date;
    updated_at: Date;
    }