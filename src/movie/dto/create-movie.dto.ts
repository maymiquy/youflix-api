import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export enum PopularStatus {
  POPULAR = 'POPULAR',
  NOTPOPULAR = 'NOTPOPULAR',
}

export class CreateMovieDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  genres: string[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  imgUrl: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  director: string;

  @ApiProperty()
  @IsNumberString()
  @IsOptional()
  rate: string;

  @ApiProperty()
  @IsEnum(PopularStatus)
  isPopular: PopularStatus;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  releaseDate: Date;

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  year: string;
}
