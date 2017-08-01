import {Game} from "./engine/game";

const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector('#canvas');
const game: Game = new Game(canvas);

game.run();