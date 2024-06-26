/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SubscriptionsModule } from './app/subscriptions.module';
import { buildSwagger, GLOBAL_PREFIX, SWAGGER_TAGS } from '@project/core';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(SubscriptionsModule);
  app.setGlobalPrefix(GLOBAL_PREFIX);
  const configService = app.get(ConfigService);
  const port = configService.get('application.port');
  const host = configService.get('application.host');
  buildSwagger(app, SWAGGER_TAGS.SUBSCRIPTIONS);
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://${host}:${port}/${GLOBAL_PREFIX}`
  );
}

bootstrap();
