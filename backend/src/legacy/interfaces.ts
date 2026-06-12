// Legacy Interfaces - Simple contracts for standalone usage

export interface IFlipTricks {
  kickflip(): Promise<string>;
  heelflip(): Promise<string>;
  varialKickflip(): Promise<string>;
  varialHeelflip(): Promise<string>;
  treFlip(): Promise<string>;
  laserFlip(): Promise<string>;
  hardflip(): Promise<string>;
  inwardHeelflip(): Promise<string>;
  hellflip(): Promise<string>;
}

export interface IOllieVariations {
  ollie(): Promise<string>;
  nollie(): Promise<string>;
  fakieOllie(): Promise<string>;
  switchOllie(): Promise<string>;
  popShoveIt(): Promise<string>;
}

export interface IManualTricks {
  manual(): Promise<string>;
  noseManual(): Promise<string>;
}

export interface IGrindSlideTricks {
  grind(): Promise<string>;
  slide(): Promise<string>;
}

export interface IGrabTricks {
  grab(): Promise<string>;
}

export interface ITrickEngine {
  flipTricks: IFlipTricks;
  ollieVariations: IOllieVariations;
  manualTricks: IManualTricks;
  grindSlideTricks: IGrindSlideTricks;
  grabTricks: IGrabTricks;
}

// Input DTOs
export interface KickflipInput { trickId: string; skaterId?: string; sessionId?: string; }
export interface HeelflipInput { trickId: string; skaterId?: string; sessionId?: string; }
export interface VarialKickflipInput { trickId: string; skaterId?: string; sessionId?: string; }
export interface VarialHeelflipInput { trickId: string; skaterId?: string; sessionId?: string; }
export interface TreFlipInput { trickId: string; skaterId?: string; sessionId?: string; }
export interface LaserFlipInput { trickId: string; skaterId?: string; sessionId?: string; }
export interface HardflipInput { trickId: string; skaterId?: string; sessionId?: string; }
export interface InwardHeelflipInput { trickId: string; skaterId?: string; sessionId?: string; }
export interface HellflipInput { trickId: string; skaterId?: string; sessionId?: string; }

export interface OllieInput { trickId: string; skaterId?: string; sessionId?: string; }
export interface NollieInput { trickId: string; skaterId?: string; sessionId?: string; }
export interface FakieOllieInput { trickId: string; skaterId?: string; sessionId?: string; }
export interface SwitchOllieInput { trickId: string; skaterId?: string; sessionId?: string; }
export interface PopShoveItInput { trickId: string; skaterId?: string; sessionId?: string; }

export interface ManualInput { trickId: string; skaterId?: string; sessionId?: string; }
export interface NoseManualInput { trickId: string; skaterId?: string; sessionId?: string; }

export interface GrindInput { trickId: string; skaterId?: string; sessionId?: string; }
export interface SlideInput { trickId: string; skaterId?: string; sessionId?: string; }

export interface GrabInput { trickId: string; skaterId?: string; sessionId?: string; }