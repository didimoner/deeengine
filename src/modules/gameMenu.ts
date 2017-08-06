import {GameScene, GameListElement} from '../shared/interfaces';
import {CANVAS_HEIGHT} from '../shared/constants';
import {GAME_LIST} from './gameList';
import {Text} from '../engine/entities/text';

export class GameMenu implements GameScene {

  private fontSize: number;
  private menuItems: Text[] = [];

  constructor() {
    this.fontSize = 36;
    this.init();
  }

  private init() {
    const itemsSize = this.fontSize * (GAME_LIST.length - 1);

    GAME_LIST.forEach((element, index) => {
      this.menuItems.push(new Text(
        element.title, 
        60, 
        index * this.fontSize + (CANVAS_HEIGHT- itemsSize) / 2,
        this.fontSize
      ));
    });
  }

  update(): void {

  }

  draw(ctx: CanvasRenderingContext2D): void {
    for (let item of this.menuItems) {
      item.draw(ctx);
    }
  }
}