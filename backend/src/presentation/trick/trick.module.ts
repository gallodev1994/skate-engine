// Trick Presentation Module
// Controllers and presentation layer wiring

import { Module } from '@nestjs/common';
import { TrickController } from './trick.controller';
import { TrickService } from './trick.service';
import { TrickRepositoryImpl } from '../../infrastructure/repositories/trick.repository.impl';
import {
  ExecuteTrickUseCase,
  FlipTricksUseCases,
  OllieVariationsUseCases,
  ManualTricksUseCases,
  GrindSlideTricksUseCases,
  GrabTricksUseCases,
  TrickManagementUseCases,
} from '../../application/usecases';

@Module({
  controllers: [TrickController],
  providers: [
    TrickService,
    {
      provide: 'ITrickRepository',
      useClass: TrickRepositoryImpl,
    },
    {
      provide: 'IFlipTrickRepository',
      useExisting: 'ITrickRepository',
    },
    {
      provide: 'IOllieVariationRepository',
      useExisting: 'ITrickRepository',
    },
    {
      provide: 'IManualTrickRepository',
      useExisting: 'ITrickRepository',
    },
    {
      provide: 'IGrindSlideRepository',
      useExisting: 'ITrickRepository',
    },
    {
      provide: 'IGrabTrickRepository',
      useExisting: 'ITrickRepository',
    },
    ExecuteTrickUseCase,
    FlipTricksUseCases,
    OllieVariationsUseCases,
    ManualTricksUseCases,
    GrindSlideTricksUseCases,
    GrabTricksUseCases,
    TrickManagementUseCases,
  ],
  exports: [TrickService],
})
export class TrickModule {}