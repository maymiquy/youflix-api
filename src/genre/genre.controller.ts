import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Res,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from '@prisma/client';
import { Request, Response } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Genres')
@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Create new genre with detail name necessary for movies',
    summary: 'Create new genre',
  })
  @UsePipes(ValidationPipe)
  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createGenreDto: CreateGenreDto
  ): Promise<Genre[] | Response> {
    const data = await this.genreService.createNew(createGenreDto);

    try {
      return res.status(HttpStatus.CREATED).json({
        message: 'Successfully, create genre',
        status: HttpStatus.CREATED,
        data: data,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: `Error occurred while creating genre: ${error}`,
        error: 'Bad Request',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Getting all genres to show',
    summary: 'Get all genres',
  })
  @Get()
  async findAll(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Genre[] | Response> {
    const data = await this.genreService.findAll();

    data.length === 0
      ? res.status(HttpStatus.NOT_FOUND).send({
          message: 'Cannot find genre is empty',
          error: 'Not found',
          status: HttpStatus.NOT_FOUND,
        })
      : data;

    try {
      return res.status(HttpStatus.OK).json({
        message: 'Successfully, get all genres',
        status: HttpStatus.OK,
        data: data,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: `Error occured while showing all genres: ${error}`,
        error: 'Bad Request',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Getting genre with params id',
    summary: 'Get genre by id',
  })
  @Get(':id')
  async findOne(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string
  ): Promise<Genre | Response | null> {
    const data = await this.genreService.findOne(id);

    if (!data)
      return res.status(HttpStatus.NOT_FOUND).send({
        message: `Cannot find genre by id: ${id}`,
        error: 'Not Found',
        status: HttpStatus.NOT_FOUND,
      });

    try {
      return res.status(HttpStatus.OK).json({
        message: `Successfully, get genre by id: ${id}`,
        status: HttpStatus.OK,
        data: data,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: `Error occured while get genre: ${error}`,
        error: 'Bad Request',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Updating genre with params id',
    summary: 'Update genre by id',
  })
  @Patch(':id')
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateGenreDto: UpdateGenreDto
  ) {
    const data = await this.genreService.update(id, updateGenreDto);

    try {
      return res.status(HttpStatus.OK).json({
        message: `Successfully, updated genre by id: ${id}`,
        status: HttpStatus.OK,
        data: data,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: `Error occured while update genre by id:  ${error}`,
        error: 'Bad Request',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Deleting genre with params id',
    summary: 'Delete genre by id',
  })
  @Delete(':id')
  async destroy(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string
  ) {
    const data = await this.genreService.remove(id);

    try {
      res.status(HttpStatus.OK).json({
        message: `Successfully, deleted genre by id: ${id}`,
        status: HttpStatus.OK,
        data: data,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send({
        message: `Error occured while delete genre: ${error}`,
        error: 'Bad Request',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
