// Use Cases: Trick Management
// CRUD operations and listing for tricks

import { Inject, Injectable } from '@nestjs/common';
import { ITrickRepository } from '../../domain/repositories/trick-repository.port';
import {
  FlipTrick, OllieVariationTrick, ManualTrick, GrindSlideTrick, GrabTrick,
  Trick, TrickCategory
} from '../../domain/entities/trick';
import {
  CreateTrickInput, UpdateTrickInput, ListTricksInput,
  TrickOutput, ListTricksOutput,
  GetTrickStatsInput, TrickStatsOutput,
  GetOverallStatsInput, OverallStatsOutput
} from '../dtos/trick.dtos';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrickManagementUseCases {
  constructor(@Inject('ITrickRepository') private readonly trickRepository: ITrickRepository) {}

  async createTrick(input: CreateTrickInput): Promise<TrickOutput> {
    let trick: Trick;

    switch (input.category) {
      case 'FLIP':
        trick = new FlipTrick(
          uuidv4(),
          input.name,
          input.difficulty,
          input.rotationDegrees || 0,
          input.flipDirection || 'none'
        );
        break;
      case 'OLLIE_VARIATION':
        trick = new OllieVariationTrick(
          uuidv4(),
          input.name,
          input.difficulty,
          input.stance || 'regular',
          input.height
        );
        break;
      case 'MANUAL':
        trick = new ManualTrick(
          uuidv4(),
          input.name,
          input.difficulty,
          input.manualType || 'manual',
          input.distance
        );
        break;
      case 'GRIND_SLIDE':
        trick = new GrindSlideTrick(
          uuidv4(),
          input.name,
          input.difficulty,
          input.grindType || 'grind',
          input.obstacleType || 'unknown'
        );
        break;
      case 'GRAB':
        trick = new GrabTrick(
          uuidv4(),
          input.name,
          input.difficulty,
          input.grabType || 'unknown',
          input.airTime
        );
        break;
      default:
        throw new Error(`Unknown trick category: ${input.category}`);
    }

    const savedTrick = await this.trickRepository.save(trick);
    return this.mapToOutput(savedTrick);
  }

  async getTrickById(id: string): Promise<TrickOutput | null> {
    const trick = await this.trickRepository.findById(id);
    return trick ? this.mapToOutput(trick) : null;
  }

  async updateTrick(input: UpdateTrickInput): Promise<TrickOutput> {
    const existingTrick = await this.trickRepository.findById(input.id);
    if (!existingTrick) {
      throw new Error(`Trick with id ${input.id} not found`);
    }

    // Create updated trick based on type
    let updatedTrick: Trick;

    if (existingTrick instanceof FlipTrick) {
      updatedTrick = new FlipTrick(
        existingTrick.id,
        input.name || existingTrick.name,
        input.difficulty || existingTrick.difficulty,
        input.rotationDegrees ?? existingTrick.rotationDegrees,
        input.flipDirection ?? existingTrick.flipDirection
      );
    } else if (existingTrick instanceof OllieVariationTrick) {
      updatedTrick = new OllieVariationTrick(
        existingTrick.id,
        input.name || existingTrick.name,
        input.difficulty || existingTrick.difficulty,
        input.stance || existingTrick.stance,
        input.height ?? existingTrick.height
      );
    } else if (existingTrick instanceof ManualTrick) {
      updatedTrick = new ManualTrick(
        existingTrick.id,
        input.name || existingTrick.name,
        input.difficulty || existingTrick.difficulty,
        input.manualType || existingTrick.manualType,
        input.distance ?? existingTrick.distance
      );
    } else if (existingTrick instanceof GrindSlideTrick) {
      updatedTrick = new GrindSlideTrick(
        existingTrick.id,
        input.name || existingTrick.name,
        input.difficulty || existingTrick.difficulty,
        input.grindType || existingTrick.grindType,
        input.obstacleType || existingTrick.obstacleType
      );
    } else if (existingTrick instanceof GrabTrick) {
      updatedTrick = new GrabTrick(
        existingTrick.id,
        input.name || existingTrick.name,
        input.difficulty || existingTrick.difficulty,
        input.grabType || existingTrick.grabType,
        input.airTime ?? existingTrick.airTime
      );
    } else {
      throw new Error('Unknown trick type');
    }

    const savedTrick = await this.trickRepository.update(updatedTrick);
    return this.mapToOutput(savedTrick);
  }

  async deleteTrick(id: string): Promise<void> {
    await this.trickRepository.delete(id);
  }

  async listTricks(input: ListTricksInput): Promise<ListTricksOutput> {
    const allTricks = await this.trickRepository.findAll();
    
    let filtered = allTricks;
    if (input.category) {
      filtered = filtered.filter(t => t.category === input.category);
    }
    if (input.difficulty) {
      filtered = filtered.filter(t => t.difficulty === input.difficulty);
    }

    const total = filtered.length;
    const offset = input.offset || 0;
    const limit = input.limit || 20;
    const paginated = filtered.slice(offset, offset + limit);

    return {
      tricks: paginated.map(t => this.mapToOutput(t)),
      total,
      limit,
      offset,
    };
  }

  async getTrickStats(input: GetTrickStatsInput): Promise<TrickStatsOutput> {
    const stats = await this.trickRepository.getTrickStats(input.trickId);
    return {
      trickId: stats.trickId,
      trickName: stats.trickName,
      totalAttempts: stats.totalAttempts,
      successfulAttempts: stats.successfulAttempts,
      successRate: stats.successRate,
      averageScore: stats.averageScore,
      lastExecutedAt: stats.lastExecutedAt,
      period: input.period || 'all',
    };
  }

  async getOverallStats(input: GetOverallStatsInput): Promise<OverallStatsOutput> {
    const stats = await this.trickRepository.getOverallStats();
    return {
      totalTricks: stats.totalTricks,
      totalExecutions: stats.totalExecutions,
      overallSuccessRate: stats.overallSuccessRate,
      tricksByCategory: stats.tricksByCategory,
      tricksByDifficulty: stats.tricksByDifficulty,
      period: input.period || 'all',
    };
  }

  private mapToOutput(trick: Trick): TrickOutput {
    const base = {
      id: trick.id,
      name: trick.name,
      difficulty: trick.difficulty,
      category: trick.category,
      createdAt: trick.createdAt,
    };

    if (trick instanceof FlipTrick) {
      return { ...base, rotationDegrees: trick.rotationDegrees, flipDirection: trick.flipDirection };
    }
    if (trick instanceof OllieVariationTrick) {
      return { ...base, stance: trick.stance, height: trick.height };
    }
    if (trick instanceof ManualTrick) {
      return { ...base, manualType: trick.manualType, distance: trick.distance };
    }
    if (trick instanceof GrindSlideTrick) {
      return { ...base, grindType: trick.grindType, obstacleType: trick.obstacleType };
    }
    if (trick instanceof GrabTrick) {
      return { ...base, grabType: trick.grabType, airTime: trick.airTime };
    }

    return base;
  }
}