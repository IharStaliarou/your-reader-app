import { IsString, IsStrongPassword, Length, MinLength } from 'class-validator';

export class SignInDto {
  @IsString({ message: 'Username must be a string' })
  @Length(2, 20, { message: 'Username must be between 2 and 20 characters' })
  userName: string;

  @IsStrongPassword(
    {},
    {
      message:
        'Password must include at least one lowercase letter, one uppercase letter, one number and one special character',
    },
  )
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
