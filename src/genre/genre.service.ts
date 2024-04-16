import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { Genre } from '@prisma/client';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenreService {
  constructor(private readonly prismaService: PrismaService) {}
  async createNew(createGenre: CreateGenreDto): Promise<Genre> {
    const { name } = createGenre;
    const genreExist = await this.prismaService.genre.findUnique({
      where: {
        name: name,
      },
    });

    if (genreExist)
      throw new ConflictException({
        message: `Genre (${genreExist.name}) allready exist`,
        error: 'Conflict',
        status: 409,
      });

    return await this.prismaService.genre.create({
      data: {
        name,
      },
    });
  }

  async findAll(): Promise<Genre[]> {
    return await this.prismaService.genre.findMany();
  }

  async findOne(id: string): Promise<Genre | null> {
    return await this.prismaService.genre.findUnique({ where: { id: id } });
  }

  async update(id: string, updateGenre: UpdateGenreDto): Promise<Genre | null> {
    const { name, movies } = updateGenre;
    const genre = await this.prismaService.genre.findUnique({
      where: {
        id: id,
      },
    });

    if (!genre)
      throw new NotFoundException({
        message: `Cannot update genre by id: ${id}`,
        error: 'Not Found',
        status: 404,
      });

    return await this.prismaService.genre.update({
      where: { id: id },
      data: {
        name,
        movies: {
          connect: movies.map((input) => ({ id: input }) || { title: input }),
        },
      },
    });
  }

  async remove(id: string): Promise<Genre | null> {
    const genre = await this.prismaService.genre.findUnique({
      where: {
        id: id,
      },
    });

    if (!genre)
      throw new NotFoundException({
        message: `genre with id (${id}) doesn't exist`,
        error: 'Not found',
        status: 404,
      });

    return await this.prismaService.genre.delete({
      where: { id: id },
    });
  }
}
