import {Coordinates} from '../../shared/interfaces';

export class Line {

  private startPos: Coordinates;
  private endPos: Coordinates;

  private width: number;
  private opacity: number;
  
  constructor(
    startX: number, startY: number, 
    endX: number, endY: number, 
    width: number = 1, opacity: number = 1
  ) {
    this.startPos = <Coordinates>{x: startX, y: startY};
    this.endPos = <Coordinates>{x: endX, y: endY};
    this.width = width;
    this.opacity = opacity;
  }

  public update(): void {

  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();

    ctx.lineWidth = this.width;
    ctx.globalAlpha = this.opacity;

    ctx.translate(-0.5, 0);
    ctx.moveTo(this.startPos.x, this.startPos.y);
    ctx.lineTo(this.endPos.x, this.endPos.y);
    ctx.stroke();

    ctx.restore();
  }
}