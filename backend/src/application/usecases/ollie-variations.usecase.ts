// Use Cases: Ollie Variations
// Specific use cases for each ollie variation

import { Inject, Injectable } from '@nestjs/common';
import { IOllieVariationRepository } from '../../domain/repositories/trick-repository.port';
import { OllieVariationTrick } from '../../domain/entities/trick';
import {
  OllieInput, OllieOutput,
  NollieInput, NollieOutput,
  FakieOllieInput, FakieOllieOutput,
  SwitchOllieInput, SwitchOllieOutput,
  PopShoveItInput, PopShoveItOutput,
} from '../dtos/trick.dtos';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OllieVariationsUseCases {
  constructor(@Inject('IOllieVariationRepository') private readonly ollieRepository: IOllieVariationRepository) {}

  private async executeOllieTrick(
    trickId: string,
    input: OllieInput | NollieInput | FakieOllieInput | SwitchOllieInput | PopShoveItInput
  ): Promise<OllieOutput | NollieOutput | FakieOllieOutput | SwitchOllieOutput | PopShoveItOutput> {
    const trick = await this.ollieRepository.findById(trickId);
    if (!trick || !(trick instanceof OllieVariationTrick)) {
      throw new Error(`Ollie variation with id ${trickId} not found`);
    }

    const result = await trick.execute();
    const executionId = uuidv4();
    
    await this.ollieRepository.recordExecution(trickId, {
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

  async ollie(input: OllieInput): Promise<OllieOutput> {
    return this.executeOllieTrick(input.trickId, input) as Promise<OllieOutput>;
  }

  async nollie(input: NollieInput): Promise<NollieOutput> {
    return this.executeOllieTrick(input.trickId, input) as Promise<NollieOutput>;
  }

  async fakieOllie(input: FakieOllieInput): Promise<FakieOllieOutput> {
    return this.executeOllieTrick(input.trickId, input) as Promise<FakieOllieOutput>;
  }

  async switchOllie(input: SwitchOllieInput): Promise<SwitchOllieOutput> {
    return this.executeOllieTrick(input.trickId, input) as Promise<SwitchOllieOutput>;
  }

  async popShoveIt(input: PopShoveItInput): Promise<PopShoveItOutput> {
    return this.executeOllieTrick(input.trickId, input) as Promise<PopShoveItOutput>;
  }
}