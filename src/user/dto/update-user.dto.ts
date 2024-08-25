import { ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  public fullName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsEmail()
  @IsOptional()
  public email?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @Length(6, 12, { message: 'Password must be between 6 and 12 characters' })
  @IsOptional()
  public password?: string;

  @ApiPropertyOptional()
  @IsEnum(ActiveStatus)
  @IsOptional()
  public status?: ActiveStatus;
}
