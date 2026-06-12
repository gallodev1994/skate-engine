// Use Cases: Grind/Slide Tricks
// Specific use cases for grind and slide tricks

import { Inject, Injectable } from '@nestjs/common';
import { IGrindSlideRepository } from '../../domain/repositories/trick-repository.port';
import { GrindSlideTrick } from '../../domain/entities/trick';
import {
  GrindInput, GrindOutput,
  SlideInput, SlideOutput,
} from '../dtos/trick.dtos';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GrindSlideTricksUseCases {
  constructor(@Inject('IGrindSlideRepository') private readonly grindSlideRepository: IGrindSlideRepository) {}

  private async executeGrindSlideTrick(
    trickId: string,
    input: GrindInput | SlideInput
  ): Promise<GrindOutput | SlideOutput> {
    const trick = await this.grindSlideRepository.findById(trickId);
    if (!trick || !(trick instanceof GrindSlideTrick)) {
      throw new Error(`Grind/Slide trick with id ${trickId} not found`);
    }

    const result = await trick.execute();
    const executionId = uuidv4();
    
    await this.grindSlideRepository.recordExecution(trickId, {
      ...result,
      timestamp: new Date(),
    });

    return {
      success: result.success,
      trickId,
      trickName: trick.name,
      message: result.message,
      timestamp: new Date(),
      metadata: {
        ...result.metadata,
        ...input.metadata,
        executionId,
        skaterId: input.skaterId,
        sessionId: input.sessionId,
      },
      executionId,
    } as any;
  }

  async grind(input: GrindInput): Promise<GrindOutput> {
    return this.executeGrindSlideTrick(input.trickId, input) as Promise<GrindOutput>;
  }

  async slide(input: SlideInput): Promise<SlideOutput> {
    return this.executeGrindSlideTrick(input.trickId, input) as Promise<SlideOutput>;
  }
}