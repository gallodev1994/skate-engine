// Use Cases: Manual Tricks
// Specific use cases for manual variations

import { Inject, Injectable } from '@nestjs/common';
import { IManualTrickRepository } from '../../domain/repositories/trick-repository.port';
import { ManualTrick } from '../../domain/entities/trick';
import {
  ManualInput, ManualOutput,
  NoseManualInput, NoseManualOutput,
} from '../dtos/trick.dtos';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ManualTricksUseCases {
  constructor(@Inject('IManualTrickRepository') private readonly manualRepository: IManualTrickRepository) {}

  private async executeManualTrick(
    trickId: string,
    input: ManualInput | NoseManualInput
  ): Promise<ManualOutput | NoseManualOutput> {
    const trick = await this.manualRepository.findById(trickId);
    if (!trick || !(trick instanceof ManualTrick)) {
      throw new Error(`Manual trick with id ${trickId} not found`);
    }

    const result = await trick.execute();
    const executionId = uuidv4();
    
    await this.manualRepository.recordExecution(trickId, {
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

  async manual(input: ManualInput): Promise<ManualOutput> {
    return this.executeManualTrick(input.trickId, input) as Promise<ManualOutput>;
  }

  async noseManual(input: NoseManualInput): Promise<NoseManualOutput> {
    return this.executeManualTrick(input.trickId, input) as Promise<NoseManualOutput>;
  }
}