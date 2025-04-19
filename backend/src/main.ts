import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000', // ambiente local
      'https://project-paggo-ocr-bioqpignp.vercel.app', // seu frontend no Vercel
    ],
    credentials: true,
  });

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
