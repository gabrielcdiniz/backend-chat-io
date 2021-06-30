import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { AppModule } from './app.module';
import { TConfiguration } from './types/configuration.type';
import * as helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger(bootstrap.name.toUpperCase());

  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get<ConfigService<TConfiguration>>(ConfigService);

  const {
    port: serverPort,
    secret,
  } = configService.get<TConfiguration['SERVER']>('SERVER');

  app.useGlobalPipes(new ValidationPipe());

  app.use(
    session({
      secret,
      resave: false,
      saveUninitialized: false,
    }),
    cookieParser(),
    helmet(),
  );

  await app.listen(serverPort);
  logger.log(`running on ${await app.getUrl()}`);
}
bootstrap();
