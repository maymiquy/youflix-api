import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { Genre, Prisma } from '@prisma/client';

@Injectable()
export class GenreService {
  constructor(private readonly prismaService: PrismaService) {}
  async createNew(data: Prisma.GenreCreateInput): Promise<Genre> {
    const genreExist = await this.prismaService.genre.findUnique({
      where: {
        genreName: data.genreName,
      },
    });

    if (genreExist)
      throw new ConflictException({
        status: 409,
        error: `Conflict, cannot create genre`,
        message: `Genre (${genreExist.genreName}) allready exist`,
      });

    return await this.prismaService.genre.create({
      data: {
        ...data,
      },
    });
  }

  async findAll(): Promise<Genre[]> {
    return await this.prismaService.genre.findMany();
  }

  async findOne(id: string): Promise<Genre | null> {
    return await this.prismaService.genre.findUnique({ where: { id: id } });
  }

  async update(
    id: string,
    updateGenreDto: UpdateGenreDto
  ): Promise<Genre | null> {
    const genre = await this.prismaService.genre.findUnique({
      where: {
        id: id,
      },
    });

    if (!genre)
      throw new NotFoundException({
        status: 404,
        message: `Not found, cannot update genre by id: ${id}`,
        error: `genre with id (${id}) doesn't exist`,
      });

    return await this.prismaService.genre.update({
      where: { id: id },
      data: {
        ...updateGenreDto,
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
        status: 404,
        error: `Not found, cannot delete genre by id: ${id}`,
        message: `genre with id (${id}) doesn't exist`,
      });

    return await this.prismaService.genre.delete({
      where: { id: id },
    });
  }
}
