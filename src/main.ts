import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import config from './config/configuration';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverless from 'serverless-http';
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());
  const logger = new Logger('Bootstrap');
  const logLevels = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

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

  app.useLogger(new Logger(logLevels));

  await app.init();

  const httpServer = app.getHttpServer();
  const handler = serverless(httpServer);

  await app.listen(config.port, () =>
    process.env.NODE_ENV === 'production'
      ? logger.log(
          `${config.appName} is running at port ${config.port} on ${config.host} in production mode.`
        )
      : logger.log(
          `${config.appName} is running at port ${config.port} on ${config.client} in development mode.`
        )
  );

  return async (event: APIGatewayProxyEvent, context: Context) => {
    const response = await handler(event, context);
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  };
}

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const app = await bootstrap();
  const response = await app(event, context);
  return response;
};

export default bootstrap();
