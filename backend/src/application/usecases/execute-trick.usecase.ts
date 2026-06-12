// Use Case: Execute Trick
// Application business rule for executing a trick

import { Inject, Injectable } from '@nestjs/common';
import { ITrickRepository } from '../../domain/repositories/trick-repository.port';
import { Trick, TrickResult } from '../../domain/entities/trick';
import { ExecuteTrickInput, ExecuteTrickOutput } from '../dtos/trick.dtos';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ExecuteTrickUseCase {
  constructor(@Inject('ITrickRepository') private readonly trickRepository: ITrickRepository) {}

  async execute(input: ExecuteTrickInput): Promise<ExecuteTrickOutput> {
    // 1. Find the trick
    const trick = await this.trickRepository.findById(input.trickId);
    if (!trick) {
      throw new Error(`Trick with id ${input.trickId} not found`);
    }

    // 2. Execute the trick (domain logic)
    const result = await trick.execute();

    // 3. Record execution
    const executionId = uuidv4();
    const executionResult: TrickResult = {
      ...result,
      timestamp: new Date(),
    };
    await this.trickRepository.recordExecution(input.trickId, executionResult);

    // 4. Return output
    return {
      success: result.success,
      trickId: input.trickId,
      trickName: trick.name,
      message: result.message,
      timestamp: executionResult.timestamp,
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