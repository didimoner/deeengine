import {BasicScreen} from "./basicScreen";
import {TestGame} from '../modules/screens/test';

export class ScreenManager {

  private screenList: BasicScreen[] = [];
  private activeScreen: number;

  constructor() {
    let testGame: TestGame = new TestGame();

    this.screenList.push(testGame);
    this.activeScreen = 0;
  }

  public update(): void {
    this.screenList[this.activeScreen].update();
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.screenList[this.activeScreen].draw(ctx);
  }
}