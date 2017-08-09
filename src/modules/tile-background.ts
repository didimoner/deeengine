import {Entity} from '../shared/interfaces';
import {GAME_FIELD_WIDTH, GAME_FIELD_HEIGHT} from '../shared/constants';
import {Tile} from '../engine/primitives/tile';

export class TileBackground implements Entity {
  
  private opacity: number;
  private background: Tile[] = [];

  constructor(opacity: number = 0.1) {
    this.opacity = opacity;

    for (let w = 0; w < GAME_FIELD_WIDTH; w++) {
      for (let h = 0; h < GAME_FIELD_HEIGHT; h++) {
        this.background.push(new Tile(w, h, this.opacity));
      }
    }
  }

  public update(deltaTime: number): void {
      
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    for (let tile of this.background) {
      tile.draw(ctx);
    }
  }
}