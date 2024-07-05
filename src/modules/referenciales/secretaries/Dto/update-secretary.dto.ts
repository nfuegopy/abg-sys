import { IsOptional, IsString, IsEmail, IsInt } from 'class-validator';

export class UpdateSecretaryDTO {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsInt()
  readonly court_id?: number;

  @IsOptional()
  @IsString()
  readonly phone?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;
}