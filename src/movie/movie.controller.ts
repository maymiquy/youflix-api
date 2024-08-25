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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'Create new movie with all required detail necessary for movies',
    summary: 'Create new movie',
  })
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

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Getting all movies to show',
    summary: 'Get all movies',
  })
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

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Getting movie with params id',
    summary: 'Get movie by id',
  })
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Movie | Response | null> {
    const data = await this.movieService.findOne(id);

    if (!data)
      return res.status(HttpStatus.NOT_FOUND).send({
        message: `Cannot find movie with id: ${id}`,
        error: 'Not found',
        status: HttpStatus.NOT_FOUND,
      });

    try {
      return res.status(HttpStatus.OK).json({
        message: `Succesfully, get movie with id: ${id}`,
        status: HttpStatus.OK,
        data: data,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: `Error occured while showing movie: ${error}`,
        error: 'Bad Request',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Updating movie with params id',
    summary: 'Update movie by id',
  })
  @Patch(':id')
  @UseInterceptors(FileInterceptor('imgUrl'))
  async update(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
    @Body() updateMovieDto: UpdateMovieDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<Movie | Response> {
    const imageFile = await this.movieService.updateImage(file);
    const data = await this.movieService.update(id, updateMovieDto, imageFile);

    try {
      return res.status(HttpStatus.OK).json({
        message: `Succesfully, update movie with id: ${id}`,
        status: HttpStatus.OK,
        data: data,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: `Error occured while updating movie: ${error}`,
        error: 'Bad Request',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Deleting movie with params id',
    summary: 'Delete movie by id',
  })
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const data = await this.movieService.remove(id);

    try {
      return res.status(HttpStatus.OK).json({
        message: `Succesfully, delete movie with id: ${id}`,
        status: HttpStatus.OK,
        data: data,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: `Error occured while deleteing movie : ${error}`,
        error: 'Bad Request',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
