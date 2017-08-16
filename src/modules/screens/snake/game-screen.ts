import {GameScreen, Coordinates, Direction} from '../../../shared/interfaces';
import {GAME_FIELD_WIDTH, GAME_FIELD_HEIGHT} from '../../../shared/constants';
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
      this.score += 5;
      this.hud.setScore(this.score);

      this.replaceFood();
      this.snake.grow();
    }
  }
  
  public draw(ctx: CanvasRenderingContext2D): void {
    this.background.draw(ctx);
    this.hud.draw(ctx);

    this.food.draw(ctx);
    this.snake.draw(ctx);
  }

  private replaceFood(): void {
    let exclude: Coordinates[] = [this.snake.getPosition(), ...this.snake.getSnakeTilePositions()];

    let x: number = 0;
    let y: number = 0;
    
    for (let i = 0; i < GAME_FIELD_WIDTH * GAME_FIELD_HEIGHT; i++) {
      x = this.getRandomNumber(0, GAME_FIELD_WIDTH);
      y = this.getRandomNumber(0, GAME_FIELD_HEIGHT);

      if (exclude.filter(pos => pos.x === x && pos.y === y).length <= 0) {
        console.log('OK!', i);
        break;
      } 
    }

    this.food.setPosition(x, y);
  }

  private getRandomNumber(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
  }
}