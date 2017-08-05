import {BasicScreen} from "../modules/screens/basicScreen";
import {TestGame} from '../modules/screens/test';
import {TilesDemo} from '../modules/screens/tilesDemo';

export class ScreenManager {

  private screenList: BasicScreen[] = [];
  private activeScreen: number;

  constructor() {
    let testGame: TestGame = new TestGame();
    let tileDemo: TilesDemo = new TilesDemo();

    this.screenList.push(testGame);
    this.screenList.push(tileDemo);
    this.activeScreen = 1;
  }

  public update(): void {
    this.screenList[this.activeScreen].update();
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.screenList[this.activeScreen].draw(ctx);
  }
}