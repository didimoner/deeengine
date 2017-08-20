import {CANVAS_WIDTH, CANVAS_HEIGHT, MAIN_COLOR} from "../../shared/constants";
import {Coordinates, Size} from '../../shared/interfaces';
import {Text} from './text';
import {Rectangle} from './rectangle';

const SIZE: Size = {w: 180, h: 80};

export class Popup {

  private background: Rectangle;
  private position: Coordinates;

  private title: Text;
  private text: Text;

  private active: boolean = true;

  constructor(x: number, y: number, title: string, text: string) {
    this.position = <Coordinates>{x: x - SIZE.w / 2, y: y - SIZE.h / 2};

    this.background = new Rectangle(
      this.position.x, 
      this.position.y, 
      SIZE.w, 
      SIZE.h,
      3, 
      MAIN_COLOR
    );

    const titleFontSize: number = 20;
    const textFontSize: number = 18;

    this.title = new Text(
      title, 
      this.position.x + (SIZE.w / 2 - (title.length * titleFontSize / 2.3) / 2), 
      this.position.y + 12, 
      titleFontSize
    );

    this.text = new Text(
      text, 
      this.position.x + (SIZE.w / 2 - (text.length * textFontSize / 2.3) / 2),
      this.position.y + 48, 
      textFontSize
    );
  }

  public update(): void {

  }

  public draw(ctx: CanvasRenderingContext2D): void {
    if (this.active) {
      this.background.draw(ctx);
      this.title.draw(ctx);
      this.text.draw(ctx);
    }
  }

  public setState(state: boolean): void {
    this.active = state;
  }
}