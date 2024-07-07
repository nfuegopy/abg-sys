import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePaymentDTO {
  @IsNotEmpty()
  @IsString()
  readonly case_id: string;

  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  readonly payment_date: Date;

  @IsNotEmpty()
  @IsString()
  readonly payment_type: string;

  @IsNotEmpty()
  @IsString()
  readonly payment_status: string;

  @IsString()
  readonly description?: string;
}