import {GameScene} from '../shared/interfaces';
import {Rectangle} from '../engine/entities/rectangle';
import {Tile} from '../engine/entities/tile';

export class TestGame implements GameScene {
  private myRect: Rectangle;
  private myRect2: Rectangle;
  private myImg: Tile;

  constructor() {
    this.myRect = new Rectangle(20, 20, 40, 20, 5, 'blue');
    this.myRect2 = new Rectangle(200, 100, 20, 30, 3, 'red');

    this.myImg = new Tile(1, 2);
  }

  public handleKeyboardInput(event: KeyboardEvent): void {
    if (event.keyCode === 27) {
      document.dispatchEvent(new CustomEvent('gameStateEvent', { detail: -1 }))
    }
  }

  public update(): void {
    this.myRect.update();
    this.myRect.move(0.5, 0.1);
    this.myRect.rotate(0.8);

    this.myRect2.update();
    this.myRect2.move(0.5, 0.1);
    this.myRect2.rotate(1.2);

    this.myImg.update();
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.myRect.draw(ctx);
    this.myRect2.draw(ctx);

    this.myImg.draw(ctx);
  }
}