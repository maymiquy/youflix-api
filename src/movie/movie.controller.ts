import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from '@prisma/client';
import { Response } from 'express';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imgUrl'))
  async create(
    @Res() res: Response,
    @Body() createMovieDto: CreateMovieDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<Movie | Response> {
    const imageFile = await this.movieService.uploadImage(file);
    const data = await this.movieService.create(createMovieDto, imageFile);

    try {
      return res.status(HttpStatus.CREATED).json({
        message: 'Successfully, create movie',
        status: HttpStatus.CREATED,
        data: data,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: `Error occurred while creating movie: ${error}`,
        error: 'Bad Request',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  @Get()
  async findAll(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Movie[] | Response> {
    const data = await this.movieService.findAll();

    data.length === 0
      ? res.status(HttpStatus.NOT_FOUND).send({
          message: 'Cannot find movies is empty',
          error: 'Not found',
          status: HttpStatus.NOT_FOUND,
        })
      : data;

    try {
      return res.status(HttpStatus.OK).json({
        message: 'Successfully, get all movies',
        status: HttpStatus.OK,
        data: data,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: `Error occured while showing all movies: ${error}`,
        error: 'Bad Request',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(+id);
  }
}
