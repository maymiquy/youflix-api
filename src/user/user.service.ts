import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<any> {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: string): Promise<any> {
    return await this.prismaService.user.findUnique({ where: { id: id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prismaService.user.update({
      where: { id: id },
      data: {
        ...updateUserDto,
      },
    });
  }

  async remove(id: string) {
    return await this.prismaService.user.delete({
      where: { id: id },
    });
  }

  search() {
    return `this action search by name & email`;
  }

  findStatus() {
    return `this action return by status`;
  }
}
