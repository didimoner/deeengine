import {Game} from "./engine/game";
import "./styles/reset.css";
import "./styles/main.styl";

const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector('#canvas');
const game: Game = new Game(canvas);

game.run();