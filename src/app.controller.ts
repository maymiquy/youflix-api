import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller({
  path: 'api',
  version: '1',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Route '/'
  @Get('/')
  getApi(): string {
    return this.appService.getApi();
  }

  // Route 'movies'
  @Get('movies')
  index(@Req() req: Request, @Res() res: Response) {
    try {
      return res.status(HttpStatus.OK).send(this.appService.getAllMovie());
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(`Error occurred while showing all movies: ${e}`);
    }
  }

  @Get('movie/show/:id')
  show(
    @Param('id') movieId: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      return res
        .status(HttpStatus.OK)
        .send(this.appService.getMovieById(movieId));
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(`Error occurred while showing movie: ${e}`);
    }
  }

  @Get('movies/popular')
  popularity(@Req() req: Request, @Res() res: Response) {
    try {
      return res
        .status(HttpStatus.OK)
        .send(this.appService.getPopularMovies(true));
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(`Error occurred while showing popular movies: ${e}`);
    }
  }

  @Get('movies/recomended')
  recomended(@Req() req: Request, @Res() res: Response) {
    try {
      return res
        .status(HttpStatus.OK)
        .send(this.appService.getRecomendedMovies());
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(`Error occurred while showing recomended movies: ${e}`);
    }
  }

  @Post('movies/add')
  create(@Req() req: Request, @Res() res: Response) {
    try {
      return res.status(HttpStatus.OK).send('Success Add new movie');
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(`Error occurred while adding new movie ${e}`);
    }
  }
}
