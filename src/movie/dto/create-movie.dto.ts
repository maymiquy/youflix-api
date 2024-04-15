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
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  genres: string[];

  @IsString()
  @IsOptional()
  imgUrl: string;

  @IsString()
  @IsNotEmpty()
  director: string;

  @IsNumberString()
  @IsOptional()
  rate: string;

  @IsEnum(PopularStatus)
  isPopular: PopularStatus;

  @IsDateString()
  @IsNotEmpty()
  releaseDate: Date;

  @IsNumberString()
  @IsNotEmpty()
  year: string;
}
