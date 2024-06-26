import { IsEmail, IsNotEmpty,MinLength } from 'class-validator';

export class CreateDefendantsDTO {

    @IsNotEmpty()
    readonly first_name: string;

    @IsNotEmpty()
    @MinLength(3)
    readonly ci_ruc: string;
    
    @IsNotEmpty()
    readonly last_name: string;

    @IsNotEmpty()
    readonly phone: string;

    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly address: string;


}
