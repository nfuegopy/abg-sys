import {  IsNotEmpty} from 'class-validator';

export class CreateRolesDto {

    @IsNotEmpty()
    readonly name: string;

}