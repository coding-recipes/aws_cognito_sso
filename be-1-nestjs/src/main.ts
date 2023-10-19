import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ exposedHeaders: ['x-access-token', 'x-refresh-token'] });
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  setupSwagger(app, configService.get('swagger'))

  await app.listen(configService.get('app.port'));
}
bootstrap();
