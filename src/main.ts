import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TConfiguration } from './types/configuration.type';
import * as session from 'express-session';

async function bootstrap() {
  const logger = new Logger(bootstrap.name.toUpperCase());

  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<TConfiguration>>(ConfigService);

  const {
    port: serverPort,
    secret,
  } = configService.get<TConfiguration['SERVER']>('SERVER');

  app.use(
    session({
      secret,
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(serverPort);
  logger.log(`running on ${await app.getUrl()}`);
}
bootstrap();
