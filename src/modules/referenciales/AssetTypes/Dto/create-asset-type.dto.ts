import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAssetTypeDTO {
  @IsNotEmpty()
  @IsString()
  readonly type_name: string;

  @IsString()
  readonly description: string;
}