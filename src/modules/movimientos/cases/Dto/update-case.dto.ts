import { IsOptional, IsString, IsNumber, IsDate } from 'class-validator';

export class UpdateCaseDTO {
  @IsOptional()
  @IsString()
  readonly case_number?: string;

  @IsOptional()
  @IsString()
  readonly court_id?: string;

  @IsOptional()
  @IsString()
  readonly secretary_id?: string;

  @IsOptional()
  @IsDate()
  readonly start_date?: Date;

  @IsOptional()
  @IsNumber()
  readonly claim_amount?: number;

  @IsOptional()
  @IsString()
  readonly impulse_description?: string;

  @IsOptional()
  @IsString()
  readonly current_status?: string;

  @IsOptional()
  @IsString()
  readonly observation?: string;

  @IsOptional()
  @IsNumber()
  readonly user_id?: number;
}