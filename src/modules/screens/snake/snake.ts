import {Entity, Position, Direction} from '../../../shared/interfaces';
import {Tile} from '../../../engine/entities/tile';

export class Snake implements Entity {

  private head: Tile;
  private tail: Tile[] = [];

  private position: Position;
  private direction: Direction;
 
  constructor() {
    this.head = new Tile(0, 0);
    this.tail.push(
      new Tile(0, 0, 0.8),
      new Tile(0, 0, 0.8),
      new Tile(0, 0, 0.8),
      new Tile(0, 0, 0.8)
    );

    this.position = <Position>{x: 0, y: 0};
    this.direction = <Direction>{x: 1, y: 0};
  }

  public update(timeDelta: number): void {
    this.updatePosition();
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    for (let part of this.tail) {
      part.draw(ctx);
    }

    this.head.draw(ctx);
  }

  public setPosition(x: number, y: number): void {
    this.position = <Position>{x, y};
  }
  public getPosition(): Position {
    return this.position;
  }

  public setDirection(x: number, y: number): void {
    this.direction = <Direction>{x, y};
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
    let headLastPos: Position = this.head.getPosition();

    for (let i = this.tail.length - 1; i > 0; i--) {
      let nextPos: Position = this.tail[i-1].getPosition();
      this.tail[i].setPosition(nextPos.x, nextPos.y);
    }
    this.tail[0].setPosition(headLastPos.x, headLastPos.y);
    this.head.setPosition(this.position.x, this.position.y);
  }
}