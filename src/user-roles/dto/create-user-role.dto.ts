import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUserRoleDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsOptional()
  organization_id?: string;

  @IsNumber()
  @IsNotEmpty()
  role_id: number;
}