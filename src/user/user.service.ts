import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../libs/prisma/prisma.service';
import { ActiveStatus } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<any> {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: string): Promise<any> {
    return await this.prismaService.user.findUnique({ where: { id: id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user)
      throw new NotFoundException({
        message: `Cannot update, User with id (${id}) doesn't exist`,
        error: 'Not found',
        status: 404,
      });

    return await this.prismaService.user.update({
      where: { id: id },
      data: {
        ...updateUserDto,
      },
    });
  }

  async remove(id: string): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user)
      throw new NotFoundException({
        message: `Cannot delete, User with id (${id}) doesn't exist`,
        error: 'Not found',
        status: 404,
      });

    return await this.prismaService.user.delete({
      where: { id: id },
    });
  }

  async search({ query }: { query: string }): Promise<any> {
    return await this.prismaService.user.findMany({
      where: {
        OR: [
          { email: { contains: query, mode: 'insensitive' } },
          { fullName: { contains: query, mode: 'insensitive' } },
        ],
      },
    });
  }

  async findByStatus(status: ActiveStatus): Promise<any> {
    return await this.prismaService.user.findMany({
      where: { status: status },
    });
  }
}
