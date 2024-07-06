import { IsOptional, IsString } from 'class-validator';

export class UpdateClientCaseDTO {
  @IsOptional()
  @IsString()
  readonly relationship_type?: string;
}