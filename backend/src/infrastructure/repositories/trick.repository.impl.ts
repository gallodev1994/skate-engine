// Trick Repository Implementation
// Infrastructure layer - Concrete implementation of domain repository ports

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import {
  ITrickRepository,
  IFlipTrickRepository,
  IOllieVariationRepository,
  IManualTrickRepository,
  IGrindSlideRepository,
  IGrabTrickRepository,
  TrickStats,
  OverallStats,
} from '../../domain/repositories/trick-repository.port';
import {
  Trick,
  FlipTrick,
  OllieVariationTrick,
  ManualTrick,
  GrindSlideTrick,
  GrabTrick,
  TrickCategory,
  TrickResult,
} from '../../domain/entities/trick';

@Injectable()
export class TrickRepositoryImpl
  implements
    ITrickRepository,
    IFlipTrickRepository,
    IOllieVariationRepository,
    IManualTrickRepository,
    IGrindSlideRepository,
    IGrabTrickRepository
{
  constructor(private readonly prisma: PrismaService) {}

  // Base query operations
  async findById(id: string): Promise<Trick | null> {
    const trick = await this.prisma.trick.findUnique({ where: { id } });
    return trick ? this.mapToDomain(trick) : null;
  }

  async findByCategory(category: TrickCategory): Promise<Trick[]> {
    const tricks = await this.prisma.trick.findMany({
      where: { category: category as any },
    });
    return tricks.map(this.mapToDomain);
  }

  async findByDifficulty(difficulty: Trick['difficulty']): Promise<Trick[]> {
    const tricks = await this.prisma.trick.findMany({
      where: { difficulty: difficulty.toUpperCase() as any },
    });
    return tricks.map(this.mapToDomain);
  }

  async findAll(): Promise<Trick[]> {
    const tricks = await this.prisma.trick.findMany();
    return tricks.map(this.mapToDomain);
  }

  // Base command operations
  async save(trick: Trick): Promise<Trick> {
    const data = this.mapToPrisma(trick);
    const saved = await this.prisma.trick.create({ data });
    return this.mapToDomain(saved);
  }

  async update(trick: Trick): Promise<Trick> {
    const data = this.mapToPrisma(trick);
    const updated = await this.prisma.trick.update({
      where: { id: trick.id },
      data,
    });
    return this.mapToDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.trick.delete({ where: { id } });
  }

  // Execution tracking
  async recordExecution(trickId: string, result: TrickResult): Promise<void> {
    await this.prisma.trickExecution.create({
      data: {
        trickId,
        success: result.success,
        message: result.message,
        metadata: result.metadata as any,
        timestamp: result.timestamp,
      },
    });
  }

  async getExecutionHistory(trickId: string): Promise<TrickResult[]> {
    const executions = await this.prisma.trickExecution.findMany({
      where: { trickId },
      orderBy: { timestamp: 'desc' },
    });
    return executions.map((e) => ({
      success: e.success,
      trickName: '',
      message: e.message,
      timestamp: e.timestamp,
      metadata: e.metadata as Record<string, unknown>,
    }));
  }

  async getRecentExecutions(limit = 10): Promise<TrickResult[]> {
    const executions = await this.prisma.trickExecution.findMany({
      orderBy: { timestamp: 'desc' },
      take: limit,
      include: { trick: true },
    });
    return executions.map((e) => ({
      success: e.success,
      trickName: e.trick.name,
      message: e.message,
      timestamp: e.timestamp,
      metadata: e.metadata as Record<string, unknown>,
    }));
  }

  // Statistics
  async getTrickStats(trickId: string): Promise<TrickStats> {
    const [total, successful] = await Promise.all([
      this.prisma.trickExecution.count({ where: { trickId } }),
      this.prisma.trickExecution.count({ where: { trickId, success: true } }),
    ]);

    const trick = await this.prisma.trick.findUnique({ where: { id: trickId } });
    const lastExecution = await this.prisma.trickExecution.findFirst({
      where: { trickId },
      orderBy: { timestamp: 'desc' },
    });

    return {
      trickId,
      trickName: trick?.name || 'Unknown',
      totalAttempts: total,
      successfulAttempts: successful,
      successRate: total > 0 ? successful / total : 0,
      lastExecutedAt: lastExecution?.timestamp,
    };
  }

  async getOverallStats(): Promise<OverallStats> {
    const [totalTricks, totalExecutions, successfulExecutions, tricksByCategory, tricksByDifficulty] =
      await Promise.all([
        this.prisma.trick.count(),
        this.prisma.trickExecution.count(),
        this.prisma.trickExecution.count({ where: { success: true } }),
        this.prisma.trick.groupBy({ by: ['category'], _count: true }),
        this.prisma.trick.groupBy({ by: ['difficulty'], _count: true }),
      ]);

    return {
      totalTricks,
      totalExecutions,
      overallSuccessRate: totalExecutions > 0 ? successfulExecutions / totalExecutions : 0,
      tricksByCategory: tricksByCategory.reduce((acc, item) => {
        acc[item.category] = item._count;
        return acc;
      }, {} as Record<TrickCategory, number>),
      tricksByDifficulty: tricksByDifficulty.reduce((acc, item) => {
        acc[item.difficulty] = item._count;
        return acc;
      }, {} as Record<string, number>),
    };
  }

  // Specialized queries
  async findFlipTricksByRotation(minDegrees: number, maxDegrees: number): Promise<Trick[]> {
    const tricks = await this.prisma.trick.findMany({
      where: {
        category: 'FLIP',
        rotationDegrees: { gte: minDegrees, lte: maxDegrees },
      },
    });
    return tricks.map(this.mapToDomain);
  }

  async findByFlipDirection(direction: 'frontside' | 'backside' | 'none'): Promise<Trick[]> {
    const tricks = await this.prisma.trick.findMany({
      where: { category: 'FLIP', flipDirection: direction.toUpperCase() as any },
    });
    return tricks.map(this.mapToDomain);
  }

  async findByStance(stance: 'regular' | 'goofy' | 'switch' | 'fakie' | 'nollie'): Promise<Trick[]> {
    const tricks = await this.prisma.trick.findMany({
      where: { category: 'OLLIE_VARIATION', stance: stance.toUpperCase() as any },
    });
    return tricks.map(this.mapToDomain);
  }

  async findByManualType(type: 'manual' | 'noseManual'): Promise<Trick[]> {
    const tricks = await this.prisma.trick.findMany({
      where: { category: 'MANUAL', manualType: type.toUpperCase() as any },
    });
    return tricks.map(this.mapToDomain);
  }

  async findByObstacleType(obstacleType: string): Promise<Trick[]> {
    const tricks = await this.prisma.trick.findMany({
      where: { category: 'GRIND_SLIDE', obstacleType: { contains: obstacleType, mode: 'insensitive' } },
    });
    return tricks.map(this.mapToDomain);
  }

  async findByGrindType(type: 'grind' | 'slide'): Promise<Trick[]> {
    const tricks = await this.prisma.trick.findMany({
      where: { category: 'GRIND_SLIDE', grindType: type.toUpperCase() as any },
    });
    return tricks.map(this.mapToDomain);
  }

  async findByGrabType(grabType: string): Promise<Trick[]> {
    const tricks = await this.prisma.trick.findMany({
      where: { category: 'GRAB', grabType: { contains: grabType, mode: 'insensitive' } },
    });
    return tricks.map(this.mapToDomain);
  }

  // Mapping helpers
  private mapToDomain(prismaTrick: any): Trick {
    switch (prismaTrick.category) {
      case 'FLIP':
        return new FlipTrick(
          prismaTrick.id,
          prismaTrick.name,
          prismaTrick.difficulty.toLowerCase(),
          prismaTrick.rotationDegrees || 0,
          prismaTrick.flipDirection?.toLowerCase() || 'none'
        );
      case 'OLLIE_VARIATION':
        return new OllieVariationTrick(
          prismaTrick.id,
          prismaTrick.name,
          prismaTrick.difficulty.toLowerCase(),
          prismaTrick.stance?.toLowerCase() || 'regular',
          prismaTrick.height
        );
      case 'MANUAL':
        return new ManualTrick(
          prismaTrick.id,
          prismaTrick.name,
          prismaTrick.difficulty.toLowerCase(),
          prismaTrick.manualType?.toLowerCase() || 'manual',
          prismaTrick.distance
        );
      case 'GRIND_SLIDE':
        return new GrindSlideTrick(
          prismaTrick.id,
          prismaTrick.name,
          prismaTrick.difficulty.toLowerCase(),
          prismaTrick.grindType?.toLowerCase() || 'grind',
          prismaTrick.obstacleType || 'unknown'
        );
      case 'GRAB':
        return new GrabTrick(
          prismaTrick.id,
          prismaTrick.name,
          prismaTrick.difficulty.toLowerCase(),
          prismaTrick.grabType || 'unknown',
          prismaTrick.airTime
        );
      default:
        throw new Error(`Unknown trick category: ${prismaTrick.category}`);
    }
  }

  private mapToPrisma(trick: Trick): any {
    const base = {
      id: trick.id,
      name: trick.name,
      difficulty: trick.difficulty.toUpperCase(),
      category: trick.category,
    };

    if (trick instanceof FlipTrick) {
      return { ...base, rotationDegrees: trick.rotationDegrees, flipDirection: trick.flipDirection.toUpperCase() };
    }
    if (trick instanceof OllieVariationTrick) {
      return { ...base, stance: trick.stance.toUpperCase(), height: trick.height };
    }
    if (trick instanceof ManualTrick) {
      return { ...base, manualType: trick.manualType.toUpperCase(), distance: trick.distance };
    }
    if (trick instanceof GrindSlideTrick) {
      return { ...base, grindType: trick.grindType.toUpperCase(), obstacleType: trick.obstacleType };
    }
    if (trick instanceof GrabTrick) {
      return { ...base, grabType: trick.grabType, airTime: trick.airTime };
    }

    return base;
  }
}