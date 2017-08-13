import {GameScreen, Coordinates, Direction} from '../../../shared/interfaces';
import {Tile} from '../../../engine/primitives/tile';
import {Snake} from './snake';
import {Food} from './food';
import {TileBackground} from '../../tile-background';
import {HUD} from '../../hud';

const CLOCK_RESET_TIME = 1;

export class SnakeGame implements GameScreen {

  private hud: HUD;
  private background: TileBackground;

  private clock: number;
  private speed: number;
  private score: number;

  private snake: Snake;
  private food: Food;

  private lastKeyCode: number;

  constructor() {
    this.hud = new HUD();
    this.background = new TileBackground();

    this.clock = 0;
    this.speed = 10;
    this.score = 0;

    this.snake = new Snake();
    this.food = new Food();

    this.hud.setSpeed(this.speed);
    this.hud.setScore(this.score);

    this.food.setPosition(0, 5);
  }

  public handleKeyboardInput(event: KeyboardEvent): void {
    let isValidInput: boolean = false;

    switch (event.keyCode) {
      case 37: // left
        if (this.lastKeyCode != 39) {
          this.snake.setDirection(-1, 0);
          isValidInput = true;
        } 

        break;
      
      case 38: // up
        if (this.lastKeyCode != 40) {
          this.snake.setDirection(0, -1);
          isValidInput = true;
        }

        break;

      case 39: // right
        if (this.lastKeyCode != 37) {
          this.snake.setDirection(1, 0);
          isValidInput = true;
        }

        break;

      case 40: // down
        if (this.lastKeyCode != 38) {
          this.snake.setDirection(0, 1);
          isValidInput = true;
        }

        break;

      case 27: // esc
        document.dispatchEvent(new CustomEvent('gameStateEvent', {detail: -1}));
        break;
    }

    if (isValidInput) {
      this.lastKeyCode = event.keyCode;
    }
  }

  public update(timeDelta: number): void {
    this.clock += timeDelta * this.speed;
    
    if (this.clock > CLOCK_RESET_TIME) {
      this.snake.update(timeDelta);
      this.snake.move();

      this.clock = 0;
    }

    if (this.snake.intersects(this.food.getHitBox())) {
      console.log('Intersects!!!');
      this.score += 5;
      this.hud.setScore(this.score);
    }
    
  }
  
  public draw(ctx: CanvasRenderingContext2D): void {
    this.background.draw(ctx);
    this.hud.draw(ctx);

    this.food.draw(ctx);
    this.snake.draw(ctx);
  }
}