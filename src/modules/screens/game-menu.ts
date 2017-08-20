import {GameScreen, GameListElement} from '../../shared/interfaces';
import {CANVAS_HEIGHT, TILE_SIZE} from '../../shared/constants';
import {GAME_LIST} from '../game-list';
import {Text} from '../../engine/components/text';
import {Tile} from '../../engine/components/tile';

export class GameMenu implements GameScreen {

  private fontSize: number;
  private menuItemsHeight: number;
  private menuItems: Text[] = [];
  private pointer: Tile;
  private activeItem: number;

  constructor() {
    this.fontSize = 36;
    this.activeItem = 0;
    this.init();
  }

  private init(): void {
    this.menuItemsHeight = this.fontSize * (GAME_LIST.length - 1);

    GAME_LIST.forEach((element, index) => {
      this.menuItems.push(new Text(
        element.title, 
        2 * TILE_SIZE, 
        index * this.fontSize + (CANVAS_HEIGHT - this.menuItemsHeight) / 2,
        this.fontSize
      ));
    });

    this.pointer = new Tile(0, 0);
  }

  public handleKeyboardInput(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case 38: // up
        if (this.activeItem !== 0) {
          this.activeItem--;
        }
        break;

      case 40: // down
        if (this.activeItem < this.menuItems.length - 1) {
          this.activeItem++;
        }
        break;

      case 32: // space
      case 13: // enter
        this.dispatchScreen();
        break;
    }
  }

  public update(timeDelta: number): void {
    this.pointer.setPosition(0, (this.activeItem * this.fontSize + (CANVAS_HEIGHT - this.menuItemsHeight) / 2) / TILE_SIZE);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    for (let item of this.menuItems) {
      item.draw(ctx);
    }

    this.pointer.draw(ctx);
  }

  private dispatchScreen(): void {
    let event: CustomEvent = new CustomEvent('gameStateEvent', {
      detail: this.activeItem
    });

    document.dispatchEvent(event);
  }
}