// Main Entry Point
// Bootstrap the application

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  // CORS
  app.enableCors();

  // Global prefix
  app.setGlobalPrefix('api');

  // Swagger setup - use 'api/docs' to work with global prefix
  const config = new DocumentBuilder()
    .setTitle('Skate Trick Engine API')
    .setDescription('API for managing and executing skate tricks')
    .setVersion('1.0')
    .addTag('tricks')
    .addTag('app')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🛹 Skate Trick Engine running on http://localhost:${port}/api`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
}

bootstrap();