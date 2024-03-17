import { MovieService } from './movie.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateMovieDto } from './dto/create-movie.dto';
import { JwtAuthGuard } from 'src/libs/jwt/jwt.guard';

@Controller({
  path: 'api/movies',
  version: '1',
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  index(@Req() req: Request, @Res() res: Response): Response<any> {
    const result = this.movieService.findAll();
    try {
      return res.status(HttpStatus.OK).send(
        JSON.stringify({
          message: 'Success to get all movies',
          data: result,
        })
      );
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(`Error occurred while showing all movies: ${e}`);
    }
  }

  @Get('/show/:id')
  show(
    @Param('id') movieId: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      return res
        .status(HttpStatus.OK)
        .send(this.movieService.findById(movieId));
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(`Error occurred while showing movie: ${e}`);
    }
  }

  @Get('/popular')
  popularity(@Req() req: Request, @Res() res: Response) {
    try {
      return res
        .status(HttpStatus.OK)
        .send(this.movieService.findPopular(true));
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(`Error occurred while showing popular movies: ${e}`);
    }
  }

  @Get('/recomended')
  recomended(@Req() req: Request, @Res() res: Response) {
    try {
      return res.status(HttpStatus.OK).send(this.movieService.findRecomended());
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(`Error occurred while showing recomended movies: ${e}`);
    }
  }

  @Post()
  create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() validation: CreateMovieDto
  ): Response<any> {
    const result = this.movieService.addMovie(validation);
    try {
      return res.status(HttpStatus.OK).send(
        JSON.stringify({
          message: 'Success create movie',
          data: result,
        })
      );
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(`Error occurred while adding new movie ${e}`);
    }
  }
}
