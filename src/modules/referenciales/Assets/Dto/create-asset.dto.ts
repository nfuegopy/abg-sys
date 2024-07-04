import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAssetDTO {
  @IsNotEmpty()
  @IsString()
  readonly type_id: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly estimated_value: number;
}