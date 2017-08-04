import {ScreenManager} from "../modules/screenManager";
import {CANVAS_WIDTH, CANVAS_HEIGHT} from "../shared/constants";

export class Game {

  private ctx: CanvasRenderingContext2D;
  private screenManager: ScreenManager;

  constructor(canvas: HTMLCanvasElement) {
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT

    this.ctx = canvas.getContext('2d');
    this.screenManager = new ScreenManager();
  }

  private update(): void {
    this.screenManager.update();
  }

  private draw(): void {
    // clearing the screen with black color
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.ctx.fillStyle = "#9EAD86";
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    this.screenManager.draw(this.ctx);
  }

  public run(): void {
    // setting up gameloop
    requestAnimationFrame(this.run.bind(this));

    this.update();
    this.draw();
  }
}