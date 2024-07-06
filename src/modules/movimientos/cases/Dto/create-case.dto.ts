import { IsNotEmpty, IsString, IsNumber, IsDate, IsOptional } from 'class-validator';

export class CreateCaseDTO {
  @IsNotEmpty()
  @IsString()
  readonly case_number: string;

  @IsNotEmpty()
  @IsString()
  readonly court_id: string;

  @IsNotEmpty()
  @IsString()
  readonly secretary_id: string;

  @IsNotEmpty()
  @IsDate()
  readonly start_date: Date;

  @IsNotEmpty()
  @IsNumber()
  readonly claim_amount: number;

  @IsOptional()
  @IsString()
  readonly impulse_description?: string;

  @IsOptional()
  @IsString()
  readonly current_status?: string;

  @IsOptional()
  @IsString()
  readonly observation?: string;

  @IsNotEmpty()
  @IsNumber()
  readonly user_id: number;
}