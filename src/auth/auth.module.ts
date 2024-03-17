import { PrismaService } from 'src/libs/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/libs/jwt/jwt.strategy';
import { expireIn, jwtSecret } from 'src/utils/constant';

@Module({
  imports: [
    JwtModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: {
        expiresIn: expireIn,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [PrismaService, AuthService, JwtStrategy],
})
export class AuthModule {}
