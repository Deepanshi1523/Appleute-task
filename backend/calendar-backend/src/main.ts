import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const port = 3001; // Set the desired port number

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(path.join(__dirname, 'uploads'), {
    prefix: '/uploads',
  });
  app.enableCors();

  await app.listen(port);

  console.log(`Server is running on http://localhost:${port}`);
}

bootstrap();
