import {GameScreen} from '../shared/interfaces';
import {GameMenu} from '../modules/gameMenu';
import {GAME_LIST} from '../modules/gameList';

export class ScreenManager {

  private activeScreen: GameScreen;
  private gameMenu: GameScreen;

  constructor() {
    this.gameMenu = new GameMenu();
    this.activeScreen = this.gameMenu;

    document.addEventListener('gameStateEvent', this.changeScreen.bind(this));
  }

  public handleKeyboardInput(event: KeyboardEvent) {
    this.activeScreen.handleKeyboardInput(event);
  }

  public update(): void {
    this.activeScreen.update();
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.activeScreen.draw(ctx);
  }

  private changeScreen(event: CustomEvent) {
    let gameIndex: number = event.detail;

    if (gameIndex === -1) {
      this.activeScreen = this.gameMenu;
    } else {
      this.activeScreen = new GAME_LIST[gameIndex].module;
    }
  }
}