import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import config from './config/configuration';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverless from 'serverless-http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());
  const logger = new Logger('Bootstrap');
  const logLevel =
    process.env.NODE_ENV === 'production'
      ? 'info' && 'error' && 'warn'
      : 'debug' && 'error';

  const cors = {
    origin: [`${config.client}`, `${config.host}`],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
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

  app.setGlobalPrefix('v1/api');

  app.use(helmet());

  app.use(cookieParser());

  app.enableCors(cors);

  app.useLogger(new Logger(logLevel));

  await app.init();

  const httpServer = app.getHttpServer();
  const handler = serverless(httpServer);

  module.exports.handler = async (event: any, context: any) => {
    const response = await handler(event, context);
    return response;
  };

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

export default bootstrap();
