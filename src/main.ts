import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable dto validations
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Enable /api refix
  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);

  const port = configService.get<number>('server.port') ?? 3000;
  await app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
}
bootstrap();
