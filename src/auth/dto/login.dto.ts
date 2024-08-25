import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 12, { message: 'Password must be between 6 and 12 characters' })
  public password: string;
}
