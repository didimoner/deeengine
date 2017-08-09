import {GameScreen, Position, Direction} from '../../../shared/interfaces';
import {Tile} from '../../../engine/entities/tile';
import {Snake} from './snake';

const CLOCK_RESET_TIME = 1;

export class SnakeGame implements GameScreen {

  private clock: number;
  private speed: number;

  private snake: Snake;
  private food: Tile;

  private score: number;

  constructor() {
    this.clock = 0;
    this.speed = 0.2;

    this.snake = new Snake();
    this.food = new Tile(0, 0, 0.6);
  }

  public handleKeyboardInput(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case 37:
        this.snake.setDirection(-1, 0);
        break;
      
      case 38:
        this.snake.setDirection(0, -1);
        break;

      case 39:
        this.snake.setDirection(1, 0);
        break;

      case 40:
        this.snake.setDirection(0, 1);
        break;

      case 27:
        document.dispatchEvent(new CustomEvent('gameStateEvent', {detail: -1}));
        break;
    }
  }

  public update(timeDelta: number): void {
    this.clock += timeDelta;

    if (this.clock > CLOCK_RESET_TIME * this.speed) {
      this.snake.move();
      this.snake.update(timeDelta);

      this.clock = 0;
    }
  }
  
  public draw(ctx: CanvasRenderingContext2D): void {
    this.food.draw(ctx);
    this.snake.draw(ctx);
  }
}