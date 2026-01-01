// dto/create-audit.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAuditDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}
