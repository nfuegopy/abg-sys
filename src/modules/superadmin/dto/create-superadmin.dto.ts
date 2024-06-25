import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateSuperAdminDto {
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
