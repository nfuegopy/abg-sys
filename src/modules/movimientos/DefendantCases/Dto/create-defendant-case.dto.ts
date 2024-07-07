import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDefendantCaseDTO {
  @IsNotEmpty()
  @IsString()
  readonly defendant_id: string;

  @IsNotEmpty()
  @IsString()
  readonly case_id: string;
}