import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/libs/jwt/jwt.guard';
import { Request, Response } from 'express';
import { ActiveStatus } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data = await this.userService.findAll();
    try {
      if (data.length === 0)
        return res.status(HttpStatus.NOT_FOUND).send({
          message: 'Cannot find users',
          error: 'Not Found',
          status: HttpStatus.NOT_FOUND,
        });

      return res.status(HttpStatus.OK).json({
        message: 'Successfully get all user',
        status: HttpStatus.OK,
        data: data,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: `Error occurred while showing user : ${e}`,
        error: 'Bad Request',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  @Get(':id')
  async findOne(
    @Res() res: Response,
    @Req() req: Request,
    @Param('id') id: string
  ) {
    const data = await this.userService.findOne(id);
    try {
      if (!data)
        return res.status(HttpStatus.NOT_FOUND).send({
          message: `Cannot find user by id: ${id}`,
          error: 'Not found',
          status: HttpStatus.NOT_FOUND,
        });

      return res.status(HttpStatus.OK).json({
        message: `Successfully find user by id: ${id}`,
        status: HttpStatus.OK,
        data: data,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: `Error occurred while get user by id: ${e}`,
        error: 'Bad Request',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  @Patch(':id')
  async update(
    @Res() res: Response,
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    const data = await this.userService.update(id, updateUserDto);
    try {
      return res.status(HttpStatus.OK).json({
        message: `Successfully update user with id: ${id}`,
        status: HttpStatus.OK,
        data: data,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: `Error occurred while update user with id: ${e}`,
        error: 'Bad Request',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  @Delete(':id')
  async destroy(
    @Res() res: Response,
    @Req() req: Request,
    @Param('id') id: string
  ) {
    const data = await this.userService.remove(id);
    try {
      return res.status(HttpStatus.OK).json({
        message: `Successfully delete user by id: ${id}`,
        status: HttpStatus.OK,
        data: data,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: `Error occurred while delete user by id: ${error}`,
        error: 'Bad Request',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  @Get('/search')
  async search(
    @Res() res: Response,
    @Req() req: Request,
    @Query('query') query: string
  ) {
    try {
      const data = await this.userService.search({ query });

      if (data.length === 0)
        return res.status(HttpStatus.NOT_FOUND).send({
          message: `Cannot search user ${query}, with query: ${query}`,
          error: 'Not Found',
          status: HttpStatus.NOT_FOUND,
        });

      return res.status(HttpStatus.OK).json({
        message: 'Successfully search user',
        status: HttpStatus.OK,
        data: data,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: `Error occurred while search user with query: ${e}`,
        error: 'Bad Request',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  @Get('/status/:status')
  async findStatus(
    @Res() res: Response,
    @Req() req: Request,
    @Param('status') status: ActiveStatus
  ) {
    const data = await this.userService.findByStatus(status);
    try {
      if (data.length === 0)
        return res.status(HttpStatus.NOT_FOUND).send({
          message: `Cannot find user by status: ${status}`,
          error: 'Not found',
          status: HttpStatus.NOT_FOUND,
        });

      return res.status(HttpStatus.OK).json({
        message: `Successfully find user by status: ${status}`,
        status: HttpStatus.OK,
        data: data,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: `Error occurred while find user by status: ${error}`,
        error: 'Bad Request',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
