import {Entity, Coordinates, Direction, HitBox} from '../../../shared/interfaces';
import {Tile} from '../../../engine/primitives/tile';
import {BorderBox} from '../../../engine/primitives/border-box';
import {TILE_SIZE} from '../../../shared/constants';

export class Food extends BorderBox implements Entity {

  private tile: Tile;

  constructor() {
    super();

    this.tile = new Tile(0, 0, 0.6);
    this.hitBox = <HitBox>{pos: this.tile.getPosition(), size: this.tile.getSize()};
  }

  public update(timeDelta: number): void {
    
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.tile.draw(ctx);
  }

  public setPosition(x: number, y: number): void {
    this.tile.setPosition(x, y);
    this.hitBox.pos = <Coordinates>{
      x: this.tile.getPosition().x * TILE_SIZE,
      y: this.tile.getPosition().y * TILE_SIZE 
    };
  }

  public getPosition(): Coordinates {
    return this.tile.getPosition();
  }
}