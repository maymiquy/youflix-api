import { PartialType } from '@nestjs/mapped-types';
import { CreateGenreDto } from './create-genre.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateGenreDto extends PartialType(CreateGenreDto) {
  @IsString()
  @IsNotEmpty()
  public genreName?: string;
}
