import { PrismaService } from 'src/libs/prisma/prisma.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { jwtSecret, expires } from 'src/utils/constant';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService
  ) {}

  async signIn(loginDto: LoginDto, req: Request, res: Response): Promise<any> {
    const { email, password } = loginDto;

    const loginUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!loginUser?.email) {
      throw new Error('User not found, please register before sign in');
    }

    const comparasion = await this.comparePasswords({
      password,
      hash: loginUser.password,
    });

    if (!comparasion) {
      throw new BadRequestException('Wrong credentials');
    }

    const token = await this.signToken({
      id: loginUser.id,
      email: loginUser.email,
    });

    if (!token) {
      throw new ForbiddenException('Something went wrong, please try again');
    }

    const expiresAt = new Date(Date.now() + Number(expires) * 60 * 1000);

    return res.cookie('token', token, {
      expires: expiresAt,
    });
  }

  async signUp(registerDto: RegisterDto) {
    const { fullName, email, password } = registerDto;

    const userExist = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (userExist) {
      throw new Error('User already exist');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    return await this.prismaService.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    });
  }

  async signOut(req: Request, res: Response) {
    return res.clearCookie('token');
  }

  async comparePasswords(args: { hash: string; password: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  async signToken(args: { id: string; email: string }) {
    const payload = {
      id: args.id,
      email: args.email,
    };

    return this.jwtService.sign(payload, {
      secret: jwtSecret,
    });
  }
}
