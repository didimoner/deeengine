import {GameScene} from '../shared/interfaces';
import {TestGame} from '../modules/test';
import {TilesDemo} from '../modules/tilesDemo';
import {GameMenu} from '../modules/gameMenu';

export class ScreenManager {

  private screenList: GameScene[] = [];
  private activeScreen: number;

  constructor() {
    let testGame: TestGame = new TestGame();
    let tileDemo: TilesDemo = new TilesDemo();
    let gameMenu: GameMenu = new GameMenu();

    this.screenList.push(testGame);
    this.screenList.push(tileDemo);
    this.screenList.push(gameMenu);
    this.activeScreen = 2;
  }

  public update(): void {
    this.screenList[this.activeScreen].update();
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.screenList[this.activeScreen].draw(ctx);
  }
}