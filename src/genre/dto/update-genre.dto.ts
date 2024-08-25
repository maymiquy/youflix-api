import { PartialType } from '@nestjs/mapped-types';
import { CreateGenreDto } from './create-genre.dto';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateGenreDto extends PartialType(CreateGenreDto) {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  public name?: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @IsNotEmpty()
  movies: string[];
}
