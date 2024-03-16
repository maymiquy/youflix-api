import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { MovieController } from './movie/movie.controller';
import { MovieService } from './movie/movie.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './libs/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MovieModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.cwd() + '.env',
    }),
    AuthModule,
  ],
  controllers: [MovieController],
  providers: [MovieService, PrismaService, JwtService],
})
export class AppModule {}
