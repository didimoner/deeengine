import {GameScreen, Coordinates, Direction, HitBox, Size} from '../../../shared/interfaces';
import {GAME_FIELD_WIDTH, GAME_FIELD_HEIGHT, TILE_SIZE, CANVAS_HEIGHT, CANVAS_WIDTH} from '../../../shared/constants';
import {Tile} from '../../../engine/components/tile';
import {Popup} from '../../../engine/components/pop-up';
import {Snake} from './snake';
import {Food} from './food';
import {TileBackground} from '../../tile-background';
import {HUD} from '../../hud';


const SPEED_UP_SCORE = 25;

enum GameState {
  ACTIVE = <any>'ACTIVE',
  PAUSED = <any>'PAUSED'
}

export class SnakeGame implements GameScreen {

  private hud: HUD;
  private background: TileBackground;
  private popup: Popup;

  private score: number;
  private lastScore: number;

  private snake: Snake;
  private food: Food;

  private lastKeyCode: number;
  private screenHitBox: HitBox[];
  private gameState: GameState;

  constructor() {
    this.hud = new HUD();
    this.background = new TileBackground();

    this.screenHitBox = [
      {pos: {x: -2, y: -2}, size: {w: GAME_FIELD_WIDTH * TILE_SIZE, h: 1}},
      {pos: {x: -2, y: -2}, size: {w: 1, h: GAME_FIELD_HEIGHT * TILE_SIZE}},
      {pos: {x: GAME_FIELD_WIDTH * TILE_SIZE + 2, y: - 2}, size: {w: 1, h: GAME_FIELD_HEIGHT * TILE_SIZE}},
      {pos: {x: -2, y: GAME_FIELD_HEIGHT * TILE_SIZE + 2}, size: {w: GAME_FIELD_WIDTH * TILE_SIZE, h: 1}},
    ];

    this.init();
  }

  public handleKeyboardInput(event: KeyboardEvent): void {
    let isValidInput: boolean = false;

    switch (event.keyCode) {
      case 37: // left
        if (this.lastKeyCode != 39) {
          this.snake.turn(-1, 0);
          isValidInput = true;
        } 

        break;
      
      case 38: // up
        if (this.lastKeyCode != 40) {
          this.snake.turn(0, -1);
          isValidInput = true;
        }

        break;

      case 39: // right
        if (this.lastKeyCode != 37) {
          this.snake.turn(1, 0);
          isValidInput = true;
        }

        break;

      case 40: // down
        if (this.lastKeyCode != 38) {
          this.snake.turn(0, 1);
          isValidInput = true;
        }

        break;

      case 27: // esc
        document.dispatchEvent(new CustomEvent('gameStateEvent', {detail: -1}));
        break;

      case 13: // enter
        if (this.gameState === GameState.PAUSED) {
          this.popup = null;
          this.init();
        }

        break;
    }

    if (isValidInput) {
      this.lastKeyCode = event.keyCode;
    }
  }

  public update(timeDelta: number): void {
    if (this.gameState === GameState.ACTIVE) {
      // intersections
      if (this.snake.intersects(this.food.getHitBox())) {
        this.score += 5;
        this.hud.setScore(this.score);

        this.replaceFood();
        this.snake.grow();
      }

      for (let hitBox of this.screenHitBox) {
        if (this.snake.intersects(hitBox)) {
          this.endGame();
        }
      }

      for (let hitBox of this.snake.getTailHitBoxes()) {
        if (this.snake.intersects(hitBox)) {
          this.endGame();
        }
      }

      this.snake.update(timeDelta);      
      
      if (this.score - this.lastScore >= SPEED_UP_SCORE) {
        const snakeSpeed: number = this.snake.getSpeed();

        this.snake.setSpeed(snakeSpeed  + 1);
        this.hud.setSpeed(snakeSpeed);
        this.lastScore = this.score;
      }
    }
  }
  
  public draw(ctx: CanvasRenderingContext2D): void {
    this.background.draw(ctx);
    this.hud.draw(ctx);

    this.food.draw(ctx);
    this.snake.draw(ctx);

    if (this.popup) {
      this.popup.draw(ctx);
    }
  }

  private init(): void {
    this.score = 0;
    this.lastScore = this.score;

    this.snake = new Snake(GAME_FIELD_WIDTH / 2, GAME_FIELD_HEIGHT / 2);
    this.food = new Food();

    this.hud.setSpeed(this.snake.getSpeed());
    this.hud.setScore(this.score);

    this.replaceFood();
    this.gameState = GameState.ACTIVE;    
  }

  private replaceFood(): void {
    let exclude: Coordinates[] = [this.snake.getPosition(), ...this.snake.getSnakeTilePositions()];

    let x: number = 0;
    let y: number = 0;
    
    for (let i = 0; i < GAME_FIELD_WIDTH * GAME_FIELD_HEIGHT; i++) {
      x = this.getRandomNumber(0, GAME_FIELD_WIDTH);
      y = this.getRandomNumber(0, GAME_FIELD_HEIGHT);

      if (exclude.filter(pos => pos.x === x && pos.y === y).length <= 0) {
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

  private endGame(): void {
    this.gameState = GameState.PAUSED;
    this.snake.setDirection(0, 0);

    this.popup = new Popup(
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT /2,
      'Game Over',
      [
        'Your result: ' + this.score.toString(), 
        'Press Enter', 
        'to continue...'
      ]
    );
    this.popup.setState(true);
  }
}