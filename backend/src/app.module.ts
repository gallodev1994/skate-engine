// Main App Module
// Composes all feature modules

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infrastructure/database/prisma.module';
import { TrickModule } from './presentation/trick/trick.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    TrickModule,
  ],
  controllers: [AppController],
})
export class AppModule {}