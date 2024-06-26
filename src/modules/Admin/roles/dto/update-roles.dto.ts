import {  IsNotEmpty} from 'class-validator';

export class UpdateRolesDto {

    @IsNotEmpty()
    readonly name: string;

}