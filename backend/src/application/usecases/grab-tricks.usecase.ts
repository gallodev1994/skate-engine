// Use Cases: Grab Tricks
// Specific use cases for grab tricks

import { Inject, Injectable } from '@nestjs/common';
import { IGrabTrickRepository } from '../../domain/repositories/trick-repository.port';
import { GrabTrick } from '../../domain/entities/trick';
import {
  GrabInput, GrabOutput,
} from '../dtos/trick.dtos';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GrabTricksUseCases {
  constructor(@Inject('IGrabTrickRepository') private readonly grabRepository: IGrabTrickRepository) {}

  async grab(input: GrabInput): Promise<GrabOutput> {
    const trick = await this.grabRepository.findById(input.trickId);
    if (!trick || !(trick instanceof GrabTrick)) {
      throw new Error(`Grab trick with id ${input.trickId} not found`);
    }

    const result = await trick.execute();
    const executionId = uuidv4();
    
    await this.grabRepository.recordExecution(input.trickId, {
      ...result,
      timestamp: new Date(),
    });

    return {
      success: result.success,
      trickId: input.trickId,
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
    };
  }
}