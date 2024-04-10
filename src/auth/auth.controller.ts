import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res() res: Response,
    @Req() req: Request
  ): Promise<User | Response | LoginDto> {
    try {
      await this.authService.signIn(loginDto, req, res);
      return res.status(HttpStatus.OK).json({
        message: 'Login successful',
      });
    } catch (e) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Invalid credentials',
        error: e,
      });
    }
  }

  @UsePipes(ValidationPipe)
  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res() res: Response
  ): Promise<User | Response | RegisterDto> {
    try {
      await this.authService.signUp(registerDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'Registration successful',
      });
    } catch (e) {
      return res.status(HttpStatus.CONFLICT).json({
        message: 'Registration failed',
        error: e,
      });
    }
  }

  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response): Promise<Response> {
    try {
      await this.authService.signOut(req, res);
      return res.status(HttpStatus.OK).json({
        message: 'Logout successful',
      });
    } catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Logout failed',
        error: e,
      });
    }
  }
}
