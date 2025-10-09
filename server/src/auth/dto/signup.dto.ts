import { CreateUserDto } from '@user/dto/create-user.dto';
import { IsStrongPassword, MinLength, Validate } from 'class-validator';
import { MatchPasswordConstraint } from '@validators/match-passwords-constraint';
export class SignUpDto extends CreateUserDto {
  @IsStrongPassword(
    {},
    {
      message:
        'Password must include at least one lowercase letter, one uppercase letter, one number and one special character',
    },
  )
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Validate(MatchPasswordConstraint)
  repeatPassword: string;
}
