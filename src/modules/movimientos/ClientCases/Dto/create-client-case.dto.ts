import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClientCaseDTO {
  @IsNotEmpty()
  @IsString()
  readonly client_id: string;

  @IsNotEmpty()
  @IsString()
  readonly case_id: string;

  @IsNotEmpty()
  @IsString()
  readonly relationship_type: string;
}