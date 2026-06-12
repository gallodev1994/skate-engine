// Interfaces (ISP - Interface Segregation Principle)
// Cada interface define um contrato específico para um tipo de manobra

export interface IFlipTricks {
  kickflip(): void;
  heelflip(): void;
  varialKickflip(): void;
  varialHeelflip(): void;
  treFlip(): void;
  laserFlip(): void;
  hardflip(): void;
  inwardHeelflip(): void;
  hellflip(): void;
}

export interface IOllieVariations {
  ollie(): void;
  nollie(): void;
  fakieOllie(): void;
  switchOllie(): void;
  popShoveIt(): void;
}

export interface IManualTricks {
  manual(): void;
  noseManual(): void;
}

export interface IGrindSlideTricks {
  grind(): void;
  slide(): void;
}

export interface IGrabTricks {
  grab(): void;
}

// Implementações concretas (SRP - Single Responsibility Principle)
// Cada classe tem uma única responsabilidade

export class FlipTricks implements IFlipTricks {
  kickflip(): void {
    console.log("Kickflip executed!");
  }

  heelflip(): void {
    console.log("Heelflip executed!");
  }

  varialKickflip(): void {
    console.log("Varial Kickflip executed!");
  }

  varialHeelflip(): void {
    console.log("Varial Heelflip executed!");
  }

  treFlip(): void {
    console.log("360 Flip (Tre Flip) executed!");
  }

  laserFlip(): void {
    console.log("Laser Flip executed!");
  }

  hardflip(): void {
    console.log("Hardflip executed!");
  }

  inwardHeelflip(): void {
    console.log("Inward Heelflip executed!");
  }

  hellflip(): void {
    console.log("Hellflip executed!");
  }
}

export class OllieVariations implements IOllieVariations {
  ollie(): void {
    console.log("Ollie executed!");
  }

  nollie(): void {
    console.log("Nollie executed!");
  }

  fakieOllie(): void {
    console.log("Fakie Ollie executed!");
  }

  switchOllie(): void {
    console.log("Switch Ollie executed!");
  }

  popShoveIt(): void {
    console.log("Pop Shove-it executed!");
  }
}

export class ManualTricks implements IManualTricks {
  manual(): void {
    console.log("Manual executed!");
  }

  noseManual(): void {
    console.log("Nose Manual executed!");
  }
}

export class GrindSlideTricks implements IGrindSlideTricks {
  grind(): void {
    console.log("Grind executed!");
  }

  slide(): void {
    console.log("Slide executed!");
  }
}

export class GrabTricks implements IGrabTricks {
  grab(): void {
    console.log("Grab executed!");
  }
}

// Engine principal (DIP - Dependency Inversion Principle)
// Depende de abstrações (interfaces), não de implementações concretas
// OCP - Open/Closed Principle: aberto para extensão, fechado para modificação

export interface IEngine {
  flipTricks: IFlipTricks;
  ollieVariations: IOllieVariations;
  manualTricks: IManualTricks;
  grindSlideTricks: IGrindSlideTricks;
  grabTricks: IGrabTricks;
}

export class Engine implements IEngine {
  public readonly flipTricks: IFlipTricks;
  public readonly ollieVariations: IOllieVariations;
  public readonly manualTricks: IManualTricks;
  public readonly grindSlideTricks: IGrindSlideTricks;
  public readonly grabTricks: IGrabTricks;

  constructor(
    flipTricks: IFlipTricks = new FlipTricks(),
    ollieVariations: IOllieVariations = new OllieVariations(),
    manualTricks: IManualTricks = new ManualTricks(),
    grindSlideTricks: IGrindSlideTricks = new GrindSlideTricks(),
    grabTricks: IGrabTricks = new GrabTricks()
  ) {
    this.flipTricks = flipTricks;
    this.ollieVariations = ollieVariations;
    this.manualTricks = manualTricks;
    this.grindSlideTricks = grindSlideTricks;
    this.grabTricks = grabTricks;
  }
}

// Factory para facilitar a criação (padrão Factory)
export class EngineFactory {
  static create(): Engine {
    return new Engine();
  }

  static createCustom(
    flipTricks?: IFlipTricks,
    ollieVariations?: IOllieVariations,
    manualTricks?: IManualTricks,
    grindSlideTricks?: IGrindSlideTricks,
    grabTricks?: IGrabTricks
  ): Engine {
    return new Engine(
      flipTricks,
      ollieVariations,
      manualTricks,
      grindSlideTricks,
      grabTricks
    );
  }
}