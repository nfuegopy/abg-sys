// src/modules/user_roles/dto/create-user-role.dto.ts
import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateUserRoleDto {
  @IsNotEmpty()
  @IsInt()
  readonly user_id: string;

  @IsNotEmpty()
  @IsInt()
  readonly role_id: string;
}
