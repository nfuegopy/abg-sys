import { IsOptional, IsString } from 'class-validator';

export class UpdateDefendantCaseDTO {
  @IsOptional()
  @IsString()
  readonly defendant_id?: string;

  @IsOptional()
  @IsString()
  readonly case_id?: string;
}