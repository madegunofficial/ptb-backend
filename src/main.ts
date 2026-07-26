/**
 * @file ptb-backend/src/main.ts
 * @description Main entry point for NestJS Backend API
 */

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Setup CORS for Ionic Mobile App & Web Frontend
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // 2. Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // 3. Swagger API Documentation Setup
  const config = new DocumentBuilder()
    .setTitle('Putra Tresna FC Academy API')
    .setDescription('Backend REST API for Putra Tresna FC Football Academy Application')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // 4. Start HTTP Listener
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Putra Tresna FC Backend running on port ${port}`);
  console.log(`📑 Swagger Documentation available at http://localhost:${port}/api/docs`);
}

bootstrap();
