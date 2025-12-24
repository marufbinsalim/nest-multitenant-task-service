import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsString()
  @IsOptional()
  organization_id?: string;

  @IsNumber()
  @IsNotEmpty()
  role_id: number;
}