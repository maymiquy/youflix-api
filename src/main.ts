import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = Number(process.env.PORT);
  const appName = process.env.APP_NAME;

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () =>
    console.log(`${appName} running on port: ${port}`)
  );
}

bootstrap();
