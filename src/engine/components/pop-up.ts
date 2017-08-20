import {CANVAS_WIDTH, CANVAS_HEIGHT, MAIN_COLOR} from "../../shared/constants";
import {Coordinates, Size} from '../../shared/interfaces';
import {Text} from './text';
import {Rectangle} from './rectangle';

const SIZE: Size = {w: 180, h: 100};

export class Popup {

  private background: Rectangle;
  private position: Coordinates;

  private content: Text[] = [];

  private active: boolean = true;

  constructor(x: number, y: number, title: string, lines: string[]) {
    this.position = <Coordinates>{x: x - SIZE.w / 2, y: y - SIZE.h / 2};

    const titleFontSize: number = 20;
    const lineFontSize: number = 18;
    const topOffset: number = 12;

    this.content.push(new Text(
      title, 
      this.position.x + (SIZE.w / 2 - (title.length * titleFontSize / 2.3) / 2), 
      this.position.y + topOffset, 
      titleFontSize
    ));

    lines.forEach((line, index) => {
      this.content.push(
        new Text(
          line, 
          this.position.x + (SIZE.w / 2 - (line.length * lineFontSize / 2.3) / 2),
          this.position.y + topOffset * 2 + titleFontSize + lineFontSize * index + 8, 
          lineFontSize
        ));
    });

    this.background = new Rectangle(
      this.position.x, 
      this.position.y, 
      SIZE.w, 
      this.content.length * titleFontSize + topOffset * 4,
      3, 
      MAIN_COLOR
    );
  }

  public update(): void {

  }

  public draw(ctx: CanvasRenderingContext2D): void {
    if (!this.active) return;
  
    this.background.draw(ctx);
    
    for (let line of this.content) {
      line.draw(ctx);
    }
  }

  public setState(state: boolean): void {
    this.active = state;
  }
}