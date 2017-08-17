import {TILE_SIZE} from "../../shared/constants";
import {Coordinates, Size} from '../../shared/interfaces';

const url = require("../../img/tile.png");

export class Tile {

  private position: Coordinates;
  private opacity: number;

  private width: number = TILE_SIZE;
  private height: number = TILE_SIZE;

  private tileImage: HTMLImageElement;
  
  constructor(x: number, y: number, opacity: number = 1) {
    this.position = <Coordinates>{
      x: x * this.width,
      y: y * this.height
    };
    this.opacity = opacity;

    this.tileImage = new Image();
    this.tileImage.src = url;
  }

  public update(): void {

  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.drawImage(this.tileImage, this.position.x, this.position.y);
    ctx.restore();
  }

  public setPosition(x: number, y: number): void {
    this.position = <Coordinates>{
      x: x * this.width,
      y: y * this.height
    };
  }

  public getPosition(): Coordinates {
    return <Coordinates> {
      x: this.position.x / TILE_SIZE,
      y: this.position.y / TILE_SIZE
    };
  }

  public getRealPosition(): Coordinates {
    return <Coordinates> {
      x: this.position.x,
      y: this.position.y
    };
  }

  public getSize(): Size {
    return <Size>{w: this.width, h: this.height};
  }
}