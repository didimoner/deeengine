import {Entity, Coordinates, Direction, HitBox} from '../../../shared/interfaces';
import {Tile} from '../../../engine/components/tile';
import {BorderBox} from '../../../engine/components/border-box';
import {TILE_SIZE} from '../../../shared/constants';

const QUEUE_LENGTH = 2;
const TAIL_OPACITY = 0.8;
const CLOCK_RESET_TIME = 1;

export class Snake extends BorderBox implements Entity {

  private head: Tile;
  private tail: Tile[] = [];

  private position: Coordinates;
  private direction: Direction;

  private clock: number;
  private speed: number;
  
  constructor(x: number = 0, y: number = 0) {
    super();

    this.clock = 0;
    this.speed = 1;

    this.head = new Tile(x, y);
    this.hitBox.size = this.head.getSize();

    this.position = <Coordinates>{x, y};
    this.hitBox.pos = this.position;
    this.direction = <Direction>{x: 0, y: 0};
  }

  public update(timeDelta: number): void {
    this.clock += timeDelta * this.speed;
    
    if (this.clock > CLOCK_RESET_TIME) {
      this.move();
      this.clock = 0;
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    for (let part of this.tail) {
      part.draw(ctx);
    }

    this.head.draw(ctx);
  }

  public turn(x: number, y: number): void {
    this.setDirection(x, y);

    this.move();
    this.clock = 0;
  } 
  
  private move(): void {
    this.setPosition(
      this.position.x + 1 * this.direction.x, 
      this.position.y + 1 * this.direction.y
    );

    this.updatePosition();    
  }

  public grow(): void {
    this.tail.push(new Tile(-1 * TILE_SIZE, -1 * TILE_SIZE, TAIL_OPACITY));
  }

  public setPosition(x: number, y: number): void {
    this.position = <Coordinates>{x, y};
    this.hitBox.pos = <Coordinates>{
      x: this.position.x * TILE_SIZE,
      y: this.position.y * TILE_SIZE 
    };
  }

  public getPosition(): Coordinates {
    return this.position;
  }

  public setDirection(x: number, y: number): void {
    this.direction = <Direction>{x, y};
  } 

  public getDirection(): Direction {
    return this.direction;
  }

  public getSpeed(): number {
    return this.speed;
  }

  public setSpeed(value: number) {
    this.speed = value;
  }

  public getHitBox(): HitBox {
    return <HitBox>{pos: this.position, size: this.head.getSize()};
  }

  public getTailHitBoxes(): HitBox[] {
    return this.tail.map(e => <HitBox>{
        pos: e.getRealPosition(),
        size: e.getSize()
      });
  }

  public getSnakeTilePositions(): Coordinates[] {
    let result: Coordinates[] = this.tail.map(e => e.getPosition());
    result.unshift(this.head.getPosition());

    return result;
  }

  private updatePosition(): void {
    if (!this.direction.x && !this.direction.y) return;

    let headLastPos: Coordinates = this.head.getPosition();

    if (this.tail.length > 0) {
      for (let i = this.tail.length - 1; i > 0; i--) {
        let nextPos: Coordinates = this.tail[i-1].getPosition();
        this.tail[i].setPosition(nextPos.x, nextPos.y);
      }
      this.tail[0].setPosition(headLastPos.x, headLastPos.y);
    }

    this.head.setPosition(this.position.x, this.position.y);
  }
}