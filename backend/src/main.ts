import { NestFactory } from '@nestjs/core';
import bodyParser from 'body-parser';
import { AppModule } from './app.module';
const fileupload = require('express-fileupload'); 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  await app.listen(3000);
}
bootstrap();
