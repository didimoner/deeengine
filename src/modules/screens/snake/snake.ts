import {Entity, Coordinates, Direction} from '../../../shared/interfaces';
import {Tile} from '../../../engine/primitives/tile';

const QUEUE_LENGTH = 2;

export class Snake implements Entity {

  private head: Tile;
  private tail: Tile[] = [];

  private position: Coordinates;
  private direction: Direction;
  private directionQueue: Direction[] = [];
 
  constructor() {
    this.head = new Tile(0, 0);
    this.tail.push(
      new Tile(0, 0, 0.8),
      new Tile(0, 0, 0.8),
      new Tile(0, 0, 0.8),
      new Tile(0, 0, 0.8),
      new Tile(0, 0, 0.8),
      new Tile(0, 0, 0.8),
      new Tile(0, 0, 0.8),
      new Tile(0, 0, 0.8),
      new Tile(0, 0, 0.8),
      new Tile(0, 0, 0.8),
      new Tile(0, 0, 0.8),
      new Tile(0, 0, 0.8),
      new Tile(0, 0, 0.8)
    );

    this.position = <Coordinates>{x: 0, y: 0};
    this.direction = <Direction>{x: 0, y: 0};
  }

  public update(timeDelta: number): void {
    if (this.directionQueue.length) {
      this.direction = this.directionQueue.pop();
    }
    
    this.updatePosition();
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    for (let part of this.tail) {
      part.draw(ctx);
    }

    this.head.draw(ctx);
  }

  public setPosition(x: number, y: number): void {
    this.position = <Coordinates>{x, y};
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

  private updatePosition(): void {
    let headLastPos: Coordinates = this.head.getPosition();

    for (let i = this.tail.length - 1; i > 0; i--) {
      let nextPos: Coordinates = this.tail[i-1].getPosition();
      this.tail[i].setPosition(nextPos.x, nextPos.y);
    }
    this.tail[0].setPosition(headLastPos.x, headLastPos.y);
    this.head.setPosition(this.position.x, this.position.y);
  }
}