import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/libs/prisma/prisma.service';
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

  async findAll() {
    return await this.prismaService.movie.findMany({
      include: {
        genres: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie with ${updateMovieDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
