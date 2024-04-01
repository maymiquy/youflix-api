import { Injectable } from '@nestjs/common';
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

    if (genreExist) throw new Error('Genre already exist');

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

  update(id: number, updateGenreDto: UpdateGenreDto) {
    return `This action updates a #${id} genre ${updateGenreDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} genre`;
  }
}
