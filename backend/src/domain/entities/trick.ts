// Domain Entities - Enterprise Business Rules
// Pure TypeScript classes with no external dependencies

export abstract class Trick {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly difficulty: 'beginner' | 'intermediate' | 'advanced' | 'pro',
    public readonly category: TrickCategory,
    public readonly createdAt: Date = new Date()
  ) {}

  abstract execute(): Promise<TrickResult>;
}

export enum TrickCategory {
  FLIP = 'FLIP',
  OLLIE_VARIATION = 'OLLIE_VARIATION',
  MANUAL = 'MANUAL',
  GRIND_SLIDE = 'GRIND_SLIDE',
  GRAB = 'GRAB',
}

export interface TrickResult {
  success: boolean;
  trickName: string;
  message: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

// Concrete Entities
export class FlipTrick extends Trick {
  constructor(
    id: string,
    name: string,
    difficulty: 'beginner' | 'intermediate' | 'advanced' | 'pro',
    public readonly rotationDegrees: number,
    public readonly flipDirection: 'frontside' | 'backside' | 'none'
  ) {
    super(id, name, difficulty, TrickCategory.FLIP);
  }

  async execute(): Promise<TrickResult> {
    return {
      success: true,
      trickName: this.name,
      message: `${this.name} executed with ${this.rotationDegrees}° rotation!`,
      timestamp: new Date(),
      metadata: { rotationDegrees: this.rotationDegrees, flipDirection: this.flipDirection },
    };
  }
}

export class OllieVariationTrick extends Trick {
  constructor(
    id: string,
    name: string,
    difficulty: 'beginner' | 'intermediate' | 'advanced' | 'pro',
    public readonly stance: 'regular' | 'goofy' | 'switch' | 'fakie' | 'nollie',
    public readonly height?: number
  ) {
    super(id, name, difficulty, TrickCategory.OLLIE_VARIATION);
  }

  async execute(): Promise<TrickResult> {
    return {
      success: true,
      trickName: this.name,
      message: `${this.name} executed in ${this.stance} stance!`,
      timestamp: new Date(),
      metadata: { stance: this.stance, height: this.height },
    };
  }
}

export class ManualTrick extends Trick {
  constructor(
    id: string,
    name: string,
    difficulty: 'beginner' | 'intermediate' | 'advanced' | 'pro',
    public readonly manualType: 'manual' | 'noseManual',
    public readonly distance?: number
  ) {
    super(id, name, difficulty, TrickCategory.MANUAL);
  }

  async execute(): Promise<TrickResult> {
    return {
      success: true,
      trickName: this.name,
      message: `${this.name} held for ${this.distance || 'unknown'} meters!`,
      timestamp: new Date(),
      metadata: { manualType: this.manualType, distance: this.distance },
    };
  }
}

export class GrindSlideTrick extends Trick {
  constructor(
    id: string,
    name: string,
    difficulty: 'beginner' | 'intermediate' | 'advanced' | 'pro',
    public readonly grindType: 'grind' | 'slide',
    public readonly obstacleType: string
  ) {
    super(id, name, difficulty, TrickCategory.GRIND_SLIDE);
  }

  async execute(): Promise<TrickResult> {
    return {
      success: true,
      trickName: this.name,
      message: `${this.name} on ${this.obstacleType}!`,
      timestamp: new Date(),
      metadata: { grindType: this.grindType, obstacleType: this.obstacleType },
    };
  }
}

export class GrabTrick extends Trick {
  constructor(
    id: string,
    name: string,
    difficulty: 'beginner' | 'intermediate' | 'advanced' | 'pro',
    public readonly grabType: string,
    public readonly airTime?: number
  ) {
    super(id, name, difficulty, TrickCategory.GRAB);
  }

  async execute(): Promise<TrickResult> {
    return {
      success: true,
      trickName: this.name,
      message: `${this.name} with ${this.grabType} grab!`,
      timestamp: new Date(),
      metadata: { grabType: this.grabType, airTime: this.airTime },
    };
  }
}