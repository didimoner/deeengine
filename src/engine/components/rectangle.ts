import {CANVAS_WIDTH, CANVAS_HEIGHT} from "../../shared/constants";
import {Coordinates, Size} from '../../shared/interfaces';

export class Rectangle {

  private position: Coordinates;
  private size: Size;

  private lineWidth: number;
  private strokeStyle: string;
  private fillStyle: string;
  
  constructor(
    x: number, 
    y: number, 
    w: number, 
    h: number,
    lineWidth: number = 3,
    fillStyle: string = 'black',
    strokeStyle: string = 'black') {
      this.position = <Coordinates>{x, y};
      this.size = <Size>{w, h};

      this.lineWidth = lineWidth;
      this.fillStyle = fillStyle;
      this.strokeStyle = strokeStyle;
  }

  public update(): void {

  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.fillStyle;
    ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h);
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = this.strokeStyle;
    ctx.strokeRect(this.position.x, this.position.y, this.size.w, this.size.h);
    ctx.restore();
  }
}