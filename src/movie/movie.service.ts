import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from '../libs/prisma/prisma.service';
import * as path from 'path';
import { createWriteStream } from 'fs';
import { Movie } from '@prisma/client';

@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}

  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!file) throw new BadRequestException('No file uploaded');

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize)
      throw new BadRequestException('File size exceeds the limit (2MB)');

    const extFile = path.extname(file.originalname);
    const fileName = `poster-${Date.now()}${extFile}`;

    // Todo in the futrure for production:
    // const filePath = join(__dirname, '..', 'public', 'img', fileName);
    const filePath = path.join(process.cwd(), 'public', 'img', fileName);

    const stream = createWriteStream(filePath);
    await new Promise((resolve, reject) => {
      stream.on('error', (err) => reject(err));
      stream.on('finish', () => resolve(fileName));
      stream.write(file.buffer);
      stream.end();
    });

    return fileName;
  }

  async updateImage(file: Express.Multer.File): Promise<string | undefined> {
    if (file) {
      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize)
        throw new BadRequestException('File size exceeds the limit (2MB)');

      const extFile = path.extname(file.originalname);
      const fileName = `poster-${Date.now()}${extFile}`;

      // Todo in the futrure for production:
      // const filePath = join(__dirname, '..', 'public', 'img', fileName);
      const filePath = path.join(process.cwd(), 'public', 'img', fileName);

      const stream = createWriteStream(filePath);
      await new Promise((resolve, reject) => {
        stream.on('error', (err) => reject(err));
        stream.on('finish', () => resolve(fileName));
        stream.write(file.buffer);
        stream.end();
      });

      return fileName;
    }
  }

  async create(
    createMovieDto: CreateMovieDto,
    fileName: string
  ): Promise<Movie> {
    const { releaseDate, genres } = createMovieDto;
    const formatedDate = new Date(releaseDate).toISOString();

    return await this.prismaService.movie.create({
      data: {
        ...createMovieDto,
        imgUrl: fileName,
        releaseDate: formatedDate,
        genres: {
          connect: genres.map((input) =>
            input.length !== 36 ? { name: input } : { id: input }
          ),
        },
      },
      include: {
        genres: true,
      },
    });
  }

  async findAll(): Promise<Movie[]> {
    return await this.prismaService.movie.findMany({
      include: {
        genres: true,
      },
    });
  }

  async findOne(id: string): Promise<Movie | null | undefined> {
    return await this.prismaService.movie.findUnique({
      where: {
        id: id,
      },
      include: {
        genres: true,
      },
    });
  }

  async update(
    id: string,
    updateMovieDto: UpdateMovieDto,
    fileName?: string
  ): Promise<Movie> {
    const { genres, releaseDate } = updateMovieDto;

    const movie = await this.prismaService.movie.findUnique({
      where: { id: id },
    });

    if (!movie)
      throw new NotFoundException({
        message: `Movie with id (${id}) doesn't exist`,
        error: 'Not found',
        status: 404,
      });

    const optionalDate = (input?: string | Date | undefined) => {
      if (!input) return movie.releaseDate;

      return new Date(input).toISOString();
    };

    const optionalFile = (input?: string | undefined) => {
      if (!input) return movie.imgUrl;

      return input;
    };

    return await this.prismaService.movie.update({
      where: { id: id },
      data: {
        ...updateMovieDto,
        imgUrl: optionalFile(fileName),
        releaseDate: optionalDate(releaseDate),
        genres: {
          connect: genres?.map((input) =>
            input.length !== 36 ? { name: input } : { id: input }
          ),
        },
      },
      include: {
        genres: true,
      },
    });
  }

  async remove(id: string): Promise<Movie | null> {
    const movie = await this.prismaService.movie.findUnique({
      where: {
        id: id,
      },
    });

    if (!movie)
      throw new NotFoundException({
        message: `Movie with id (${id}) doesn't exist`,
        error: 'Not found',
        status: 404,
      });

    return await this.prismaService.movie.delete({
      where: { id: id },
    });
  }
}
