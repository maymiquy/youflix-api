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
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/libs/jwt/jwt.guard';
import { Request, Response } from 'express';

@UseGuards(JwtAuthGuard)
@Controller({
  path: 'api/users',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data = await this.userService.findAll();
    try {
      if (!data)
        return res.status(HttpStatus.NOT_FOUND).send({
          status: HttpStatus.NOT_FOUND,
          message: `Not found, Cannot find users`,
        });

      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Successfully get all user',
        data: data,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: `Error occurred while showing user : ${e}`,
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
          status: HttpStatus.NOT_FOUND,
          message: `Not found, Cannot find user by id: ${id}`,
        });

      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: `Successfully find user by id: ${id}`,
        data: data,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: `Error occurred while get user by id: ${e}`,
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
      if (!data)
        return res.status(HttpStatus.NOT_FOUND).send({
          status: HttpStatus.NOT_FOUND,
          message: `Not found, Cannot update user with id: ${id}`,
        });

      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: `Successfully update user with id: ${id}`,
        data: data,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: `Error occurred while update user with id: ${e}`,
      });
    }
  }

  @Delete(':id')
  async remove(
    @Res() res: Response,
    @Req() req: Request,
    @Param('id') id: string
  ) {
    const data = await this.userService.remove(id);
    try {
      if (!data)
        return res.status(HttpStatus.NOT_FOUND).send({
          status: HttpStatus.NOT_FOUND,
          message: `Not found, Cannot delete user by id: ${id}`,
        });

      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: `Successfully delete user by id: ${id}`,
        data: data,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: `Error occurred while delete user by id: ${error}`,
      });
    }
  }
}