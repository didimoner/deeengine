import {GameScene} from '../shared/interfaces';
import {Tile} from '../engine/entities/tile';
import {TileFigure} from '../engine/entities/figure';

export class TilesDemo implements GameScene {
  private tiles: Tile[] = [];
  private figure: TileFigure;

  constructor() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 20; j++) {
        this.tiles.push(new Tile(i, j, 0.1));
      }
    }

    let pattern: string[] = [
    ' 9 ', 
    '919', 
    ' 9',
    '9 9'
  ];
    this.figure = new TileFigure(1, 0, pattern);
    this.figure.setPosition(5, 5);
  }

  public update(): void {
    for (let tile of this.tiles) {
      tile.update();
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    for (let tile of this.tiles) {
      tile.draw(ctx);
    }

    this.figure.draw(ctx);
  }
}