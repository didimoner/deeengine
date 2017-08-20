import {Entity, Coordinates, Direction, HitBox} from '../../../shared/interfaces';
import {Tile} from '../../../engine/components/tile';
import {BorderBox} from '../../../engine/components/border-box';
import {TILE_SIZE} from '../../../shared/constants';

const QUEUE_LENGTH = 2;
const TAIL_OPACITY = 0.8;

export class Snake extends BorderBox implements Entity {

  private head: Tile;
  private tail: Tile[] = [];

  private position: Coordinates;
  private direction: Direction;
  private directionQueue: Direction[] = [];
 
  constructor(x: number = 0, y: number = 0) {
    super();

    this.head = new Tile(x, y);
    this.hitBox.size = this.head.getSize();

    this.position = <Coordinates>{x, y};
    this.hitBox.pos = this.position;
    this.direction = <Direction>{x: 0, y: 0};
  }

  public update(timeDelta: number): void {
    if (this.directionQueue.length) {
      this.direction = this.directionQueue.pop();
    }

    if (this.direction.x || this.direction.y) {
      this.updatePosition();
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    for (let part of this.tail) {
      part.draw(ctx);
    }

    this.head.draw(ctx);
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
    if (this.directionQueue.length > QUEUE_LENGTH) {
      this.directionQueue.pop();
    }

    this.directionQueue.unshift(<Direction>{x, y});
  } 
  
  public getDirection(): Direction {
    return this.direction;
  }

  public move(): void {
    this.setPosition(
      this.position.x + 1 * this.direction.x, 
      this.position.y + 1 * this.direction.y
    );
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

  public grow(): void {
    const lastTile: Tile = this.tail.length ? this.tail[this.tail.length - 1] : this.head;
    const lastTailPos: Coordinates = lastTile.getPosition();

    this.tail.push(new Tile(lastTailPos.x, lastTailPos.y, TAIL_OPACITY));
  }

  private updatePosition(): void {
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