// Use Cases: Flip Tricks
// Specific use cases for each flip trick type

import { Inject, Injectable } from '@nestjs/common';
import { IFlipTrickRepository } from '../../domain/repositories/trick-repository.port';
import { FlipTrick } from '../../domain/entities/trick';
import {
  KickflipInput, KickflipOutput,
  HeelflipInput, HeelflipOutput,
  VarialKickflipInput, VarialKickflipOutput,
  VarialHeelflipInput, VarialHeelflipOutput,
  TreFlipInput, TreFlipOutput,
  LaserFlipInput, LaserFlipOutput,
  HardflipInput, HardflipOutput,
  InwardHeelflipInput, InwardHeelflipOutput,
  HellflipInput, HellflipOutput,
} from '../dtos/trick.dtos';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FlipTricksUseCases {
  constructor(@Inject('IFlipTrickRepository') private readonly flipTrickRepository: IFlipTrickRepository) {}

  private async executeFlipTrick(
    trickId: string,
    input: KickflipInput | HeelflipInput | VarialKickflipInput | VarialHeelflipInput |
           TreFlipInput | LaserFlipInput | HardflipInput | InwardHeelflipInput | HellflipInput
  ): Promise<KickflipOutput | HeelflipOutput | VarialKickflipOutput | VarialHeelflipOutput |
             TreFlipOutput | LaserFlipOutput | HardflipOutput | InwardHeelflipOutput | HellflipOutput> {
    const trick = await this.flipTrickRepository.findById(trickId);
    if (!trick || !(trick instanceof FlipTrick)) {
      throw new Error(`Flip trick with id ${trickId} not found`);
    }

    const result = await trick.execute();
    const executionId = uuidv4();
    
    await this.flipTrickRepository.recordExecution(trickId, {
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

  async kickflip(input: KickflipInput): Promise<KickflipOutput> {
    return this.executeFlipTrick(input.trickId, input) as Promise<KickflipOutput>;
  }

  async heelflip(input: HeelflipInput): Promise<HeelflipOutput> {
    return this.executeFlipTrick(input.trickId, input) as Promise<HeelflipOutput>;
  }

  async varialKickflip(input: VarialKickflipInput): Promise<VarialKickflipOutput> {
    return this.executeFlipTrick(input.trickId, input) as Promise<VarialKickflipOutput>;
  }

  async varialHeelflip(input: VarialHeelflipInput): Promise<VarialHeelflipOutput> {
    return this.executeFlipTrick(input.trickId, input) as Promise<VarialHeelflipOutput>;
  }

  async treFlip(input: TreFlipInput): Promise<TreFlipOutput> {
    return this.executeFlipTrick(input.trickId, input) as Promise<TreFlipOutput>;
  }

  async laserFlip(input: LaserFlipInput): Promise<LaserFlipOutput> {
    return this.executeFlipTrick(input.trickId, input) as Promise<LaserFlipOutput>;
  }

  async hardflip(input: HardflipInput): Promise<HardflipOutput> {
    return this.executeFlipTrick(input.trickId, input) as Promise<HardflipOutput>;
  }

  async inwardHeelflip(input: InwardHeelflipInput): Promise<InwardHeelflipOutput> {
    return this.executeFlipTrick(input.trickId, input) as Promise<InwardHeelflipOutput>;
  }

  async hellflip(input: HellflipInput): Promise<HellflipOutput> {
    return this.executeFlipTrick(input.trickId, input) as Promise<HellflipOutput>;
  }
}