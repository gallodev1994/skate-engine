// Domain Repository Interfaces (Ports)
// Define contracts for data persistence - no implementation details

import { Trick, TrickCategory, TrickResult } from '../entities/trick';

export interface ITrickRepository {
  // Query operations
  findById(id: string): Promise<Trick | null>;
  findByCategory(category: TrickCategory): Promise<Trick[]>;
  findByDifficulty(difficulty: Trick['difficulty']): Promise<Trick[]>;
  findAll(): Promise<Trick[]>;

  // Command operations
  save(trick: Trick): Promise<Trick>;
  update(trick: Trick): Promise<Trick>;
  delete(id: string): Promise<void>;

  // Execution tracking
  recordExecution(trickId: string, result: TrickResult): Promise<void>;
  getExecutionHistory(trickId: string): Promise<TrickResult[]>;
  getRecentExecutions(limit?: number): Promise<TrickResult[]>;

  // Statistics
  getTrickStats(trickId: string): Promise<TrickStats>;
  getOverallStats(): Promise<OverallStats>;
}

export interface TrickStats {
  trickId: string;
  trickName: string;
  totalAttempts: number;
  successfulAttempts: number;
  successRate: number;
  averageScore?: number;
  lastExecutedAt?: Date;
}

export interface OverallStats {
  totalTricks: number;
  totalExecutions: number;
  overallSuccessRate: number;
  tricksByCategory: Record<TrickCategory, number>;
  tricksByDifficulty: Record<string, number>;
}

// Specialized repository interfaces (ISP)
export interface IFlipTrickRepository extends ITrickRepository {
  findFlipTricksByRotation(minDegrees: number, maxDegrees: number): Promise<Trick[]>;
  findByFlipDirection(direction: 'frontside' | 'backside' | 'none'): Promise<Trick[]>;
}

export interface IOllieVariationRepository extends ITrickRepository {
  findByStance(stance: 'regular' | 'goofy' | 'switch' | 'fakie' | 'nollie'): Promise<Trick[]>;
}

export interface IManualTrickRepository extends ITrickRepository {
  findByManualType(type: 'manual' | 'noseManual'): Promise<Trick[]>;
}

export interface IGrindSlideRepository extends ITrickRepository {
  findByObstacleType(obstacleType: string): Promise<Trick[]>;
  findByGrindType(type: 'grind' | 'slide'): Promise<Trick[]>;
}

export interface IGrabTrickRepository extends ITrickRepository {
  findByGrabType(grabType: string): Promise<Trick[]>;
}