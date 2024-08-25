import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public name: string;
}
