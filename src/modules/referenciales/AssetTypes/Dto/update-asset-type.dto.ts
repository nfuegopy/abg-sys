import { IsOptional, IsString } from 'class-validator';

export class UpdateAssetTypeDTO {
  @IsOptional()
  @IsString()
  readonly type_name?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;
}