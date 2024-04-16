import { PartialType } from '@nestjs/mapped-types';
import { CreateGenreDto } from './create-genre.dto';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateGenreDto extends PartialType(CreateGenreDto) {
  @IsString()
  @IsOptional()
  public name?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @IsNotEmpty()
  movies: string[];
}
