import {GameScreen} from '../shared/interfaces';
import {Tile} from '../engine/entities/tile';
import {TileFigure} from '../engine/entities/figure';

export class TilesDemo implements GameScreen {
  
  private tiles: Tile[] = [];
  private figures: TileFigure[] = [];

  constructor() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 20; j++) {
        this.tiles.push(new Tile(i, j, 0.1));
      }
    }

    let pattern: string[] = [
      ' 9 ', 
      '999', 
      ' 9',
      '9 9'
    ];
    let pattern2: string[] = [
      '99', 
      '9 ', 
      '9 '
    ];

    this.figures.push(new TileFigure(1, 0, pattern));
    this.figures.push(new TileFigure(5, 5, pattern2));
  }

  public handleKeyboardInput(event: KeyboardEvent): void {
    if (event.keyCode === 27) {
      document.dispatchEvent(new CustomEvent('gameStateEvent', { detail: -1 }))
    }
  }

  public update(): void {

  }

  public draw(ctx: CanvasRenderingContext2D): void {
    for (let tile of this.tiles) {
      tile.draw(ctx);
    }

    for (let figure of this.figures) {
      figure.draw(ctx);
    }
  }
}