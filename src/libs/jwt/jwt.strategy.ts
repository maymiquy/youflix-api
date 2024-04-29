import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import jwt from '../../utils/constant';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: jwt.secret,
    });
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'token' in req.cookies) {
      return req.cookies.token;
    }
    return null;
  }

  async validate(payload: { id: string; email: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.id,
        email: payload.email,
      },
    });

    return user;
  }
}
