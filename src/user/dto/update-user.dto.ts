import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

enum ActiveStatus {
  IsActive = 'IsActive',
  NotActive = 'NotActive',
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  public fullName?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  public email?: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 12, { message: 'Password must be between 6 and 12 characters' })
  @IsOptional()
  public password?: string;

  @IsEnum(ActiveStatus)
  @IsOptional()
  public status?: ActiveStatus;
}
