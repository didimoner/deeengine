import {CANVAS_WIDTH, CANVAS_HEIGHT} from "../../../shared/constants";

const url = require("../../../img/tile.png");

export class Tile {

  private x: number;
  private y: number;

  private width: number = 20;
  private height: number = 20;

  private xDirection: number = 1;
  private yDirection: number = 1;

  private rotation: number = 0;
  private testImg: HTMLImageElement;
  
  constructor(x: number, y: number) {
      this.x = x;
      this.y = y;

      this.testImg = new Image();
      this.testImg.src = url;
  }

  public update(): void {
    if (this.x + this.width/2 >= CANVAS_WIDTH) {
      this.xDirection = -1;
    } else if (this.x + this.width/2 <= 0) {
      this.xDirection = 1;
    }

    if (this.y + this.height/2 >= CANVAS_HEIGHT) {
      this.yDirection = -1;
    } else if (this.y + this.height/2 <= 0) {
      this.yDirection = 1;
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();

    ctx.translate(this.width/2 + this.x, this.height/2 + this.y);
    ctx.rotate(this.rotation * Math.PI/180);
    ctx.translate(-this.width/2 - this.x, -this.height/2 - this.y);

    ctx.drawImage(this.testImg, this.x,this.y);

    ctx.restore();
  }

  public move(x: number, y: number): void { 
    this.x += x * this.xDirection;
    this.y += y * this.yDirection;
  }

  public rotate(rotation: number): void {
    this.rotation += rotation;
  }
}