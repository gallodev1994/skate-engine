// Legacy Engine - Standalone Usage
// This file provides a simple interface for using the skate trick engine without NestJS
// For the full Clean Architecture implementation, use the NestJS modules in src/

import { Engine, EngineFactory } from './legacy/engine';

export { Engine, EngineFactory } from './legacy/engine';
export { IFlipTricks, IOllieVariations, IManualTricks, IGrindSlideTricks, IGrabTricks, ITrickEngine } from './legacy/interfaces';
export type {
  KickflipInput, HeelflipInput, VarialKickflipInput, VarialHeelflipInput,
  TreFlipInput, LaserFlipInput, HardflipInput, InwardHeelflipInput, HellflipInput,
  OllieInput, NollieInput, FakieOllieInput, SwitchOllieInput, PopShoveItInput,
  ManualInput, NoseManualInput, GrindInput, SlideInput, GrabInput,
} from './legacy/dtos';