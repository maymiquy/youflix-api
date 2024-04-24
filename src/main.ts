import { NestFactory } from '@nestjs/core';
import {
  Logger,
  RequestMethod,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import config from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const logLevel =
    process.env.NODE_ENV === 'production'
      ? 'info' && 'error' && 'warn'
      : 'debug' && 'error';

  const cors = {
    origin: [`${config.client}:${config.port}`, `${config.host}`],
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

  app.useLogger(new Logger(logLevel));

  await app.listen(config.port, () =>
    process.env.NODE_ENV === 'production'
      ? logger.log(
          `${config.appName} is running at port ${config.port} on ${config.host} in production mode.`
        )
      : logger.log(
          `${config.appName} is running at port ${config.port} on ${config.client} in development mode.`
        )
  );
}

bootstrap();
