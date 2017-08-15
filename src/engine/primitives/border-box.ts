import {HitBox, Coordinates, Size} from '../../shared/interfaces';

export class BorderBox {

  protected hitBox: HitBox;

  constructor() {
    this.hitBox = <HitBox>{
      pos: {x: 0, y: 0},
      size: {w: 0, h: 0} 
    };
  }

  public intersects(object: HitBox): boolean {
    let xOverlap: boolean = false;
    let yOverlap: boolean = false;

    if (this.hitBox.pos.x < object.pos.x) {
      if ((this.hitBox.pos.x + this.hitBox.size.w) > object.pos.x) {
        xOverlap = true;
      }
    } else {
      if (this.hitBox.pos.x < (object.pos.x + object.size.w)) {
        xOverlap = true;
      }
    }

    if (this.hitBox.pos.y < object.pos.y) {
      if ((this.hitBox.pos.y + this.hitBox.size.h) > object.pos.y) {
        yOverlap = true;
      }
    } else {
      if (this.hitBox.pos.y < (object.pos.y + object.size.h)) {
        yOverlap = true;
      }
    }

    return xOverlap && yOverlap;
  }

  public getHitBox(): HitBox {
    return this.hitBox;
  }
}