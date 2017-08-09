import {CANVAS_WIDTH, CANVAS_HEIGHT} from "../../shared/constants";
import {Coordinates, Size} from '../../shared/interfaces';

export class Rectangle {

  private position: Coordinates;
  private size: Size;

  private lineWidth: number;
  private strokeStyle: string;
  private fillStyle: string;

  private xDirection: number = 1;
  private yDirection: number = 1;

  private rotation: number = 0;
  
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
    if (this.position.x + this.size.w/2 >= CANVAS_WIDTH) {
      this.xDirection = -1;
    } else if (this.position.x + this.size.w/2 <= 0) {
      this.xDirection = 1;
    }

    if (this.position.y + this.size.h/2 >= CANVAS_HEIGHT) {
      this.yDirection = -1;
    } else if (this.position.y + this.size.h/2 <= 0) {
      this.yDirection = 1;
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();

    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.strokeStyle;
    ctx.fillStyle = this.fillStyle;
    
    ctx.translate(this.size.w/2 + this.position.x, this.size.h/2 + this.position.y);
    ctx.rotate(this.rotation * Math.PI/180);
    ctx.translate(-this.size.w/2 - this.position.x, -this.size.h/2 - this.position.y);

    ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h);

    ctx.restore();
  }

  public move(x: number, y: number): void { 
    this.position.x += x * this.xDirection;
    this.position.y += y * this.yDirection;
  }

  public rotate(rotation: number): void {
    this.rotation += rotation;
  }
}