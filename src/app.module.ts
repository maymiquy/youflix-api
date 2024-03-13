import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { MovieModule } from './movie/movie.module';
import { MovieController } from './movie/movie.controller';
import { UserService } from './user/user.service';
import { MovieService } from './movie/movie.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    MovieModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.cwd() + '.env',
    }),
  ],
  controllers: [AppController, MovieController, UserController],
  providers: [AppService, MovieService, UserService],
})
export class AppModule {}
