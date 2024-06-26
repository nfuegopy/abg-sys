
import {IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class UpdateUsersDto {

    @IsOptional()
    @IsNotEmpty()
    readonly name?: string;

    @IsOptional()
    @IsEmail()
    readonly email?: string;

    @IsOptional()
    @MinLength(6)
    readonly password?: string;

    @IsOptional()
    readonly is_active?: boolean;
    
}

