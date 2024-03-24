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
    const user = await this.userService.findAll();
    try {
      return res.status(HttpStatus.OK).json({
        message: 'Successfully get all user',
        data: user,
      });
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: `Error occurred while showing user : ${e}` });
    }
  }

  @Get(':id')
  async findOne(
    @Res() res: Response,
    @Req() req: Request,
    @Param('id') id: string
  ) {
    try {
      const user = await this.userService.findOne(id);
      return res.status(HttpStatus.OK).send({
        message: `Successfully get user by id: ${id}`,
        data: user,
      });
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: `Error occurred while get user by id: ${e}` });
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
