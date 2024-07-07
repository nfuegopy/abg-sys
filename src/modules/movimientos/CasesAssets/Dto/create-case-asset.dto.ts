import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCaseAssetDTO {
  @IsNotEmpty()
  @IsString()
  readonly case_id: string;

  @IsNotEmpty()
  @IsString()
  readonly asset_id: string;
}