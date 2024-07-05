import { IsNotEmpty, IsString, IsEmail, IsInt } from 'class-validator';

export class CreateSecretaryDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsInt()
  readonly court_id: number;

  @IsString()
  readonly phone: string;

  @IsEmail()
  readonly email: string;
}