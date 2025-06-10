import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,      // Loại bỏ field không nằm trong DTO
      forbidNonWhitelisted: true, // Ném lỗi nếu có field dư
      transform: true,      // Tự động chuyển đổi kiểu
    }),
  );
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  await app.listen(3000);
  Logger.log('🚀 API Gateway service is running on http://localhost:3000');
}
bootstrap();
