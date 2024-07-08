// src/modules/movimientos/CaseHistory/dto/create-case-history.dto.ts

import { IsNotEmpty, IsString, IsObject } from 'class-validator';

export class CreateCaseHistoryDTO {
  @IsNotEmpty()
  @IsString()
  readonly case_id: string;

  @IsNotEmpty()
  @IsString()
  readonly action_type: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsObject()
  readonly changed_fields: Record<string, unknown>;

  @IsNotEmpty()
  @IsString()
  readonly user_id: string;
}