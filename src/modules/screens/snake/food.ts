import {Entity, Coordinates, Direction, HitBox} from '../../../shared/interfaces';
import {Tile} from '../../../engine/components/tile';
import {BorderBox} from '../../../engine/components/border-box';
import {TILE_SIZE} from '../../../shared/constants';

const FOOD_OPACITY = 0.5;

export class Food extends BorderBox implements Entity {

  private tile: Tile;

  constructor() {
    super();

    this.tile = new Tile(0, 0, FOOD_OPACITY);
    this.hitBox = <HitBox>{pos: this.tile.getRealPosition(), size: this.tile.getSize()};
  }

  public update(timeDelta: number): void {
    
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.tile.draw(ctx);
  }

  public setPosition(x: number, y: number): void {
    this.tile.setPosition(x, y);
    this.hitBox.pos = this.tile.getRealPosition();
  }

  public getPosition(): Coordinates {
    return this.tile.getPosition();
  }
}