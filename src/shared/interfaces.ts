export interface Coordinates {
  x: number;
  y: number;
}

export interface Size {
  w: number;
  h: number;
}

export interface HitBox {
  pos: Coordinates;
  size: Size;
}

export interface Direction {
  x: number;
  y: number;
}

export interface Entity {
  update(timeDelta: number): void;
  draw(ctx: CanvasRenderingContext2D): void;
}

export interface GameScreen {
  handleKeyboardInput(event: KeyboardEvent): void;
  update(timeDelta: number): void;
  draw(ctx: CanvasRenderingContext2D): void;
}

export interface GameListElement {
  title: string;
  module: GameScreen;
}