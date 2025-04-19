import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000', // ambiente local
      'https://project-paggo-ocr-up.vercel.app/', // seu frontend no Vercel
    ],
    credentials: true,
  });

  console.log('CORS habilitado para: ', [
    'http://localhost:3000',
    'https://project-paggo-ocr-up.vercel.app',
  ]);

  const port = process.env.PORT;
if (!port) throw new Error('PORT is not defined in environment variables');
await app.listen(port);
}
bootstrap();
