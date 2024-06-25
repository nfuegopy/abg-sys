// se crea el model o iterface en nestj para ser utilizado dentro de firebase

export interface Users {
id?: string;
name: string;
email: string;
password: string;
is_active: boolean;
create_at: Date;
update_at: Date;
}