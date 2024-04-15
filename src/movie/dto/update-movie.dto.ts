import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { PopularStatus } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  genreId?: string;

  @IsString()
  @IsOptional()
  imgUrl: string;

  @IsString()
  @IsOptional()
  director: string;

  @IsString()
  @IsOptional()
  rate: string;

  @IsEnum(PopularStatus)
  @IsOptional()
  isPopular: PopularStatus;

  @IsDate()
  @IsOptional()
  releaseDate?: Date;

  @IsString()
  @IsOptional()
  year?: string;
}
