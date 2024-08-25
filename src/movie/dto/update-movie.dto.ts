import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { PopularStatus } from './create-movie.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  genres?: string[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  imgUrl?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  director?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  rate?: string;

  @ApiPropertyOptional()
  @IsEnum(PopularStatus)
  @IsOptional()
  isPopular?: PopularStatus;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  releaseDate?: Date;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  year?: string;
}
