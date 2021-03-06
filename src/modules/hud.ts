import {Text} from '../engine/components/text';
import {Line} from '../engine/components/line';
import {GAME_FIELD_WIDTH, GAME_FIELD_HEIGHT, TILE_SIZE} from '../shared/constants';

export class HUD {

  private score: HudElement;
  private level: HudElement;
  private speed: HudElement;
  private separator: Line;

  constructor() {
    this.score = new HudElement('Score', 0, 0);
    this.level = new HudElement('Level', 1, 14 * TILE_SIZE);
    this.speed = new HudElement('Speed', 1, 17 * TILE_SIZE);

    this.separator = new Line(
      GAME_FIELD_WIDTH * TILE_SIZE, 
      0, 
      GAME_FIELD_WIDTH * TILE_SIZE, 
      GAME_FIELD_HEIGHT * TILE_SIZE, 
      1.1, 
      0.8);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.score.draw(ctx);
    this.level.draw(ctx);
    this.speed.draw(ctx);

    this.separator.draw(ctx);
  }

  public setScore(value: number): void {
    this.score.setValue(value);
  }
  public getScore(): number {
    return this.score.getValue();
  }

  public setLevel(value: number): void {
    this.level.setValue(value);
  }
  public getLevel(): number {
    return this.score.getValue();
  }

  public setSpeed(value: number): void {
    this.speed.setValue(value);
  }
  public getSpeed(): number {
    return this.score.getValue();
  }
}

class HudElement {

  private title: Text;
  private value: Text;
  
  constructor(title: string, value: number, yPosition: number) { 
    const fontSize: number = 18;
    const xPosition: number = GAME_FIELD_WIDTH * TILE_SIZE + 2;

    this.title = new Text(title, xPosition, yPosition, fontSize);
    this.value = new Text(value.toString(10).padStart(5), xPosition, yPosition + fontSize, fontSize);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.title.draw(ctx);
    this.value.draw(ctx);
  }

  public setValue(value: number): void {
    this.value.setValue(value.toString(10).padStart(5));
  }
  public getValue(): number {
    return Number(this.value.getValue());
  }
}