export class Rectangle {

  private x: number;
  private y: number;

  private width: number;
  private height: number;

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
      this.x = x;
      this.y = y;
      this.width = w;
      this.height = h;
      this.lineWidth = lineWidth;
      this.fillStyle = fillStyle;
      this.strokeStyle = strokeStyle;
  }

  public update(): void {
    if (this.x + this.width/2 >= 320) {
      this.xDirection = -1;
    } else if (this.x + this.width/2 <= 0) {
      this.xDirection = 1;
    }

    if (this.y + this.height/2 >= 240) {
      this.yDirection = -1;
    } else if (this.y + this.height/2 <= 0) {
      this.yDirection = 1;
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();

    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.strokeStyle;
    ctx.fillStyle = this.fillStyle;
    
    ctx.translate(this.width/2 + this.x, this.height/2 + this.y);
    ctx.rotate(this.rotation * Math.PI/180);
    ctx.translate(-this.width/2 - this.x, -this.height/2 - this.y);

    ctx.fillRect(this.x, this.y, this.width, this.height);

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