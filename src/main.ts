import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import config from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const logger = new Logger('Bootstrap');
  const logLevels = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

  const cors = {
    origin: [`${config.client}`, `${config.host}`],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  };

  const docsConfig = new DocumentBuilder()
    .setTitle('Youflix REST API')
    .setDescription(
      'Documentation for Spec Youflix REST API.\n\n`root endpoints: https://youflix-api.vercel.app/v1/api`'
    )
    .setBasePath('/v1/api')
    .setVersion('1.0')
    .addBearerAuth()
    .setContact(
      'maymiquy',
      'https://www.maymiquy.cloud',
      'miqhambali@gmail.com'
    )
    .build();

  const document = SwaggerModule.createDocument(app, docsConfig);

  SwaggerModule.setup('/', app, document, {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
    ],
  });

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
