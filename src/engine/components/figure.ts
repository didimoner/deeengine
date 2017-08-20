import {Tile} from './/tile';
import {TILE_SIZE} from '../../shared/constants';
import {Coordinates} from '../../shared/interfaces';

export class TileFigure {

  private position: Coordinates;
  private figure: Tile[];
  
  constructor(x: number, y: number, pattern: string[]) {
    this.position = <Coordinates>{x, y};

    this.figure = this.parsePattern(pattern);
    this.setPosition(this.position.x, this.position.y);
  }

  private parsePattern(pattern: string[]): Tile[] {
    let tiles: Tile[] = [];

    for (let [rowIndex, row] of Object.entries(pattern)) {
      row.split('').forEach((item, index) => {
        if (RegExp(/^[0-9]$/g).exec(item)) {
          tiles.push(new Tile(index, Number(rowIndex), Number(item) * 0.1));
        }
      });
    }

    return tiles;
  }

  public update(): void {

  }

  public draw(ctx: CanvasRenderingContext2D): void {
    for (let tile of this.figure) {
      tile.draw(ctx);
    }
  }

  public setPosition(x: number, y: number): void {
    this.position = <Coordinates>{x, y};

    for (let tile of this.figure) {
      tile.setPosition(tile.getPosition().x + this.position.x, tile.getPosition().y + this.position.y);
    }
  }

  public getPosition(): Coordinates {
    return this.position;
  }
}