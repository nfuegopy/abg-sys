import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCourtsDTO {

    @IsNotEmpty()
    readonly name: string;
 
    @IsNotEmpty()
    readonly phone: string;

    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly address: string;


}
