import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './libs/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GenreModule } from './genre/genre.module';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.cwd() + '.env',
    }),
    MovieModule,
    AuthModule,
    UserModule,
    GenreModule,
  ],
  providers: [PrismaService, JwtService],
})
export class AppModule {}
