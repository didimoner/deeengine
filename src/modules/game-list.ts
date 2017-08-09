import {TilesDemo} from "./screens/tiles-demo";
import {TestGame} from "./screens/test";
import {SnakeGame} from './screens/snake/game-screen';

export const GAME_LIST = [
  {title: 'The Snake', module: SnakeGame},
  {title: 'Test Game', module: TestGame},
  {title: 'Tiles Demo', module: TilesDemo}
];