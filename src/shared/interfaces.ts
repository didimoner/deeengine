export interface Position {
  x: number;
  y: number;
}

export interface Size {
  w: number;
  h: number;
}

export interface GameScene {
  update(): void;
  draw(ctx: CanvasRenderingContext2D): void;
}