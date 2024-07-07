import { IsOptional, IsString, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePaymentDTO {
  @IsOptional()
  @IsNumber()
  readonly amount?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly payment_date?: Date;

  @IsOptional()
  @IsString()
  readonly payment_type?: string;

  @IsOptional()
  @IsString()
  readonly payment_status?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;
}