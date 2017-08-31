import {ScreenManager} from "./screen-manager";
import {CANVAS_WIDTH, CANVAS_HEIGHT, MAIN_COLOR} from "../shared/constants";

export class Game {

  private ctx: CanvasRenderingContext2D;
  private screenManager: ScreenManager;

  private currTime: number = 0;
  private lastTime: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT

    this.ctx = canvas.getContext('2d');
    this.screenManager = new ScreenManager();

    this.currTime = Date.now();
    this.lastTime = this.currTime;

    document.addEventListener('keydown', event => this.screenManager.handleKeyboardInput(event));
  }

  private update(): void {
    this.currTime = Date.now();
    const timeDelta = (this.currTime - this.lastTime) / 1000;
    this.lastTime = this.currTime;

    this.screenManager.update(timeDelta);
  }

  private draw(): void {
    // clearing the screen
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.ctx.fillStyle = MAIN_COLOR;
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