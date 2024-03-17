import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 12, { message: 'Password must be between 6 and 12 characters' })
  public password: string;
}
