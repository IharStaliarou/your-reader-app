import { IsNotEmpty, IsString } from 'class-validator';

export class VerificationDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
