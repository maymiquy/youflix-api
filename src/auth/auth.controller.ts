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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description: 'Login user with valid credentials.',
    summary: 'Login user with credential email and password.',
  })
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
        status: HttpStatus.OK,
      });
    } catch (e) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Invalid credentials',
        error: e,
        status: HttpStatus.UNAUTHORIZED,
      });
    }
  }

  @ApiOperation({
    description: 'Register a new user with valid credentials.',
    summary: 'Register user with credentials fullname email & password.',
  })
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
        status: HttpStatus.CREATED,
      });
    } catch (e) {
      return res.status(HttpStatus.CONFLICT).json({
        message: 'Registration failed',
        error: e,
        status: HttpStatus.CONFLICT,
      });
    }
  }

  @ApiOperation({
    description: 'Logout user with clear cookie jwt token.',
    summary: 'Logout user with clearing cookie.',
  })
  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response): Promise<Response> {
    try {
      await this.authService.signOut(req, res);
      return res.status(HttpStatus.OK).json({
        message: 'Logout successful',
        status: HttpStatus.OK,
      });
    } catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Logout failed',
        error: e,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
