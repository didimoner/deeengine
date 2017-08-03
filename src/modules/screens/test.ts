import {BasicScreen} from "../basicScreen";
import {Rectangle} from '../../modules/screens/entities/rectangle';

export class TestGame extends BasicScreen {
  private myRect: Rectangle;
  private myRect2: Rectangle;

  constructor() {
    super();

    this.myRect = new Rectangle(20, 20, 40, 20, 5, 'blue');
    this.myRect2 = new Rectangle(200, 100, 20, 30, 3, 'red');
  }

  public update(): void {
    this.myRect.update();
    this.myRect.move(0.5, 0.1);
    this.myRect.rotate(0.8);

    this.myRect2.update();
    this.myRect2.move(0.5, 0.1);
    this.myRect2.rotate(1.2);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.myRect.draw(ctx);
    this.myRect2.draw(ctx);
  }
}