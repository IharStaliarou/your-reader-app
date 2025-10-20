import { CreateUserDto } from '@user/dto/create-user.dto';
import {
  IsOptional,
  IsStrongPassword,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPasswordConstraint } from '@validators/match-passwords-constraint';
export class SignUpUserDto extends CreateUserDto {
  @IsStrongPassword(
    {},
    {
      message:
        'Password must include at least one lowercase letter, one uppercase letter, one number and one special character',
    },
  )
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Validate(MatchPasswordConstraint)
  @IsOptional()
  repeatPassword: string;
}
