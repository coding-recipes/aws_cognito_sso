import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerSetup } from './swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  swaggerSetup(app)

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 8001);
}
bootstrap();