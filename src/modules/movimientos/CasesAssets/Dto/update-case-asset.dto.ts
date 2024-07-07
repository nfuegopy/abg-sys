import { IsOptional, IsString } from 'class-validator';

export class UpdateCaseAssetDTO {
  @IsOptional()
  @IsString()
  readonly case_id?: string;

  @IsOptional()
  @IsString()
  readonly asset_id?: string;
}