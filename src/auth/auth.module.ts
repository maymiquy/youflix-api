import { PrismaService } from '../libs/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../libs/jwt/jwt.strategy';
import jwt from '../utils/constant';

@Module({
  imports: [
    JwtModule,
    PassportModule,
    JwtModule.register({ secret: jwt.secret }),
  ],
  controllers: [AuthController],
  providers: [PrismaService, AuthService, JwtStrategy],
})
export class AuthModule {}
