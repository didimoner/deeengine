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
    this.speed = 0.5;

    this.snake = new Snake();
    this.food = new Tile(0, 0, 0.6);
  }

  public handleKeyboardInput(event: KeyboardEvent): void {

  }

  public update(timeDelta: number): void {
    this.clock += timeDelta;

    if (this.clock > CLOCK_RESET_TIME * this.speed) {
      const snakePos: Position = this.snake.getPosition();
      const snakeDir: Direction = this.snake.getDirection();

      this.snake.setPosition(
        snakePos.x + 1 * snakeDir.x, 
        snakePos.y + 1 * snakeDir.y
      );

      this.snake.update(timeDelta);

      this.clock = 0;
    }
  }
  
  public draw(ctx: CanvasRenderingContext2D): void {
    this.food.draw(ctx);
    this.snake.draw(ctx);
  }
}