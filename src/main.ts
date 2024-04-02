import { NestFactory } from '@nestjs/core';
import { RequestMethod, ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const port = Number(process.env.APP_PORT);
  const local = process.env.APP_CLIENT;
  const host = process.env.APP_HOST;
  const appName = process.env.APP_NAME;
  const cors = {
    origin: [`${local}:${port}`, `${host}`],
    methods: `GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS`,
  };

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  app.setGlobalPrefix('v1/api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  app.use(helmet());

  app.use(cookieParser());

  app.enableCors(cors);

  await app.listen(port, () =>
    console.log(`${appName} running on port: ${port}`)
  );
}

bootstrap();
