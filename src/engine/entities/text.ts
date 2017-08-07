import {Position} from '../../shared/interfaces';

export class Text {
  
  private value: string;
  private position: Position;
  private fontSize: number;
  private fontName: string;
  private fontColor: string;

  constructor(
    value: string,
    x: number,
    y: number,
    fontSize: number, 
    fontName: string = 'Digital-7', 
    fontColor: string = 'black'
  ) {
    this.value = value;
    this.position = <Position>{x, y};
    this.fontSize = fontSize;
    this.fontName = fontName;
    this.fontColor = fontColor;
  }

  public update(): void {

  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.font = `${this.fontSize}px ${this.fontName}, verdana, sans-serif`;
    ctx.fillStyle = this.fontColor;
    ctx.fillText(this.value, this.position.x, this.position.y + this.fontSize / 2 + 6);
    ctx.restore();
  }

  public setPosition(x: number, y: number): void {
    this.position = <Position>{x, y};
  }

  public getPosition(): Position {
    return this.position;
  }

  public setValue(value: string): void {
    this.value = value;
  }
  public getValue(): string {
    return this.value;
  }
}