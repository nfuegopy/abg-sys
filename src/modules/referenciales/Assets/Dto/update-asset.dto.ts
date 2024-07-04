import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateAssetDTO {
  @IsOptional()
  @IsString()
  readonly type_id?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsNumber()
  readonly estimated_value?: number;
}