/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CANVAS_WIDTH = 248;
exports.CANVAS_HEIGHT = 400;
exports.TILE_SIZE = 20;
exports.GAME_FIELD_WIDTH = 10;
exports.GAME_FIELD_HEIGHT = 20;
exports.MAIN_COLOR = "#9EAD86";


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(0);
var url = __webpack_require__(12);
var Tile = (function () {
    function Tile(x, y, opacity) {
        if (opacity === void 0) { opacity = 1; }
        this.width = constants_1.TILE_SIZE;
        this.height = constants_1.TILE_SIZE;
        this.position = {
            x: x * this.width,
            y: y * this.height
        };
        this.opacity = opacity;
        this.tileImage = new Image();
        this.tileImage.src = url;
    }
    Tile.prototype.update = function () {
    };
    Tile.prototype.draw = function (ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(this.tileImage, this.position.x, this.position.y);
        ctx.restore();
    };
    Tile.prototype.setPosition = function (x, y) {
        this.position = {
            x: x * this.width,
            y: y * this.height
        };
    };
    Tile.prototype.getPosition = function () {
        return {
            x: this.position.x / constants_1.TILE_SIZE,
            y: this.position.y / constants_1.TILE_SIZE
        };
    };
    Tile.prototype.getRealPosition = function () {
        return {
            x: this.position.x,
            y: this.position.y
        };
    };
    Tile.prototype.getSize = function () {
        return { w: this.width, h: this.height };
    };
    return Tile;
}());
exports.Tile = Tile;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Text = (function () {
    function Text(value, x, y, fontSize, fontName, fontColor) {
        if (fontName === void 0) { fontName = 'Digital-7'; }
        if (fontColor === void 0) { fontColor = 'black'; }
        this.value = value;
        this.position = { x: x, y: y };
        this.fontSize = fontSize;
        this.fontName = fontName;
        this.fontColor = fontColor;
    }
    Text.prototype.update = function () {
    };
    Text.prototype.draw = function (ctx) {
        ctx.save();
        ctx.font = this.fontSize + "px " + this.fontName + ", verdana, sans-serif";
        ctx.fillStyle = this.fontColor;
        ctx.fillText(this.value, this.position.x, this.position.y + this.fontSize / 2 + 6);
        ctx.restore();
    };
    Text.prototype.setPosition = function (x, y) {
        this.position = { x: x, y: y };
    };
    Text.prototype.getPosition = function () {
        return this.position;
    };
    Text.prototype.setValue = function (value) {
        this.value = value;
    };
    Text.prototype.getValue = function () {
        return this.value;
    };
    return Text;
}());
exports.Text = Text;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tiles_demo_1 = __webpack_require__(11);
var game_screen_1 = __webpack_require__(15);
exports.GAME_LIST = [
    { title: 'The Snake', module: game_screen_1.SnakeGame },
    { title: 'Tiles Demo', module: tiles_demo_1.TilesDemo }
];


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var text_1 = __webpack_require__(2);
var line_1 = __webpack_require__(14);
var constants_1 = __webpack_require__(0);
var HUD = (function () {
    function HUD() {
        this.score = new HudElement('Score', 0, 0);
        this.level = new HudElement('Level', 1, 14 * constants_1.TILE_SIZE);
        this.speed = new HudElement('Speed', 1, 17 * constants_1.TILE_SIZE);
        this.separator = new line_1.Line(constants_1.GAME_FIELD_WIDTH * constants_1.TILE_SIZE, 0, constants_1.GAME_FIELD_WIDTH * constants_1.TILE_SIZE, constants_1.GAME_FIELD_HEIGHT * constants_1.TILE_SIZE, 1.1, 0.8);
    }
    HUD.prototype.draw = function (ctx) {
        this.score.draw(ctx);
        this.level.draw(ctx);
        this.speed.draw(ctx);
        this.separator.draw(ctx);
    };
    HUD.prototype.setScore = function (value) {
        this.score.setValue(value);
    };
    HUD.prototype.getScore = function () {
        return this.score.getValue();
    };
    HUD.prototype.setLevel = function (value) {
        this.level.setValue(value);
    };
    HUD.prototype.getLevel = function () {
        return this.score.getValue();
    };
    HUD.prototype.setSpeed = function (value) {
        this.speed.setValue(value);
    };
    HUD.prototype.getSpeed = function () {
        return this.score.getValue();
    };
    return HUD;
}());
exports.HUD = HUD;
var HudElement = (function () {
    function HudElement(title, value, yPosition) {
        var fontSize = 18;
        var xPosition = constants_1.GAME_FIELD_WIDTH * constants_1.TILE_SIZE + 2;
        this.title = new text_1.Text(title, xPosition, yPosition, fontSize);
        this.value = new text_1.Text(value.toString().padStart(5), xPosition, yPosition + fontSize, fontSize);
    }
    HudElement.prototype.draw = function (ctx) {
        this.title.draw(ctx);
        this.value.draw(ctx);
    };
    HudElement.prototype.setValue = function (value) {
        this.value.setValue(value.toString().padStart(5));
    };
    HudElement.prototype.getValue = function () {
        return Number(this.value.getValue());
    };
    return HudElement;
}());


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BorderBox = (function () {
    function BorderBox() {
        this.hitBox = {
            pos: { x: 0, y: 0 },
            size: { w: 0, h: 0 }
        };
    }
    BorderBox.prototype.intersects = function (object) {
        var xOverlap = false;
        var yOverlap = false;
        if (this.hitBox.pos.x < object.pos.x) {
            if ((this.hitBox.pos.x + this.hitBox.size.w) > object.pos.x) {
                xOverlap = true;
            }
        }
        else {
            if (this.hitBox.pos.x < (object.pos.x + object.size.w)) {
                xOverlap = true;
            }
        }
        if (this.hitBox.pos.y < object.pos.y) {
            if ((this.hitBox.pos.y + this.hitBox.size.h) > object.pos.y) {
                yOverlap = true;
            }
        }
        else {
            if (this.hitBox.pos.y < (object.pos.y + object.size.h)) {
                yOverlap = true;
            }
        }
        return xOverlap && yOverlap;
    };
    BorderBox.prototype.getHitBox = function () {
        return this.hitBox;
    };
    return BorderBox;
}());
exports.BorderBox = BorderBox;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = __webpack_require__(8);
__webpack_require__(21);
__webpack_require__(22);
var canvas = document.querySelector('#canvas');
var game = new game_1.Game(canvas);
game.run();


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var screen_manager_1 = __webpack_require__(9);
var constants_1 = __webpack_require__(0);
var Game = (function () {
    function Game(canvas) {
        var _this = this;
        this.currTime = 0;
        this.lastTime = 0;
        canvas.width = constants_1.CANVAS_WIDTH;
        canvas.height = constants_1.CANVAS_HEIGHT;
        this.ctx = canvas.getContext('2d');
        this.screenManager = new screen_manager_1.ScreenManager();
        this.currTime = Date.now();
        this.lastTime = this.currTime;
        document.addEventListener('keydown', function (event) { return _this.screenManager.handleKeyboardInput(event); });
    }
    Game.prototype.update = function () {
        this.currTime = Date.now();
        var timeDelta = (this.currTime - this.lastTime) / 1000;
        this.lastTime = this.currTime;
        this.screenManager.update(timeDelta);
    };
    Game.prototype.draw = function () {
        // clearing the screen
        this.ctx.clearRect(0, 0, constants_1.CANVAS_WIDTH, constants_1.CANVAS_HEIGHT);
        this.ctx.fillStyle = constants_1.MAIN_COLOR;
        this.ctx.fillRect(0, 0, constants_1.CANVAS_WIDTH, constants_1.CANVAS_HEIGHT);
        this.screenManager.draw(this.ctx);
    };
    Game.prototype.run = function () {
        // setting up gameloop
        requestAnimationFrame(this.run.bind(this));
        this.update();
        this.draw();
    };
    return Game;
}());
exports.Game = Game;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var game_menu_1 = __webpack_require__(10);
var game_list_1 = __webpack_require__(3);
var ScreenManager = (function () {
    function ScreenManager() {
        this.gameMenu = new game_menu_1.GameMenu();
        this.activeScreen = this.gameMenu;
        document.addEventListener('gameStateEvent', this.changeScreen.bind(this));
    }
    ScreenManager.prototype.handleKeyboardInput = function (event) {
        this.activeScreen.handleKeyboardInput(event);
    };
    ScreenManager.prototype.update = function (timeDelta) {
        this.activeScreen.update(timeDelta);
    };
    ScreenManager.prototype.draw = function (ctx) {
        this.activeScreen.draw(ctx);
    };
    ScreenManager.prototype.changeScreen = function (event) {
        var gameIndex = event.detail;
        if (gameIndex === -1) {
            this.activeScreen = this.gameMenu;
        }
        else {
            this.activeScreen = new game_list_1.GAME_LIST[gameIndex].module;
        }
    };
    return ScreenManager;
}());
exports.ScreenManager = ScreenManager;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(0);
var game_list_1 = __webpack_require__(3);
var text_1 = __webpack_require__(2);
var tile_1 = __webpack_require__(1);
var GameMenu = (function () {
    function GameMenu() {
        this.menuItems = [];
        this.fontSize = 36;
        this.activeItem = 0;
        this.init();
    }
    GameMenu.prototype.init = function () {
        var _this = this;
        this.menuItemsHeight = this.fontSize * (game_list_1.GAME_LIST.length - 1);
        game_list_1.GAME_LIST.forEach(function (element, index) {
            _this.menuItems.push(new text_1.Text(element.title, 2 * constants_1.TILE_SIZE, index * _this.fontSize + (constants_1.CANVAS_HEIGHT - _this.menuItemsHeight) / 2, _this.fontSize));
        });
        this.pointer = new tile_1.Tile(0, 0);
    };
    GameMenu.prototype.handleKeyboardInput = function (event) {
        switch (event.keyCode) {
            case 38:// up
                if (this.activeItem !== 0) {
                    this.activeItem--;
                }
                break;
            case 40:// down
                if (this.activeItem < this.menuItems.length - 1) {
                    this.activeItem++;
                }
                break;
            case 32: // space
            case 13:// enter
                this.dispatchScreen();
                break;
        }
    };
    GameMenu.prototype.update = function (timeDelta) {
        this.pointer.setPosition(0, (this.activeItem * this.fontSize + (constants_1.CANVAS_HEIGHT - this.menuItemsHeight) / 2) / constants_1.TILE_SIZE);
    };
    GameMenu.prototype.draw = function (ctx) {
        for (var _i = 0, _a = this.menuItems; _i < _a.length; _i++) {
            var item = _a[_i];
            item.draw(ctx);
        }
        this.pointer.draw(ctx);
    };
    GameMenu.prototype.dispatchScreen = function () {
        var event = new CustomEvent('gameStateEvent', {
            detail: this.activeItem
        });
        document.dispatchEvent(event);
    };
    return GameMenu;
}());
exports.GameMenu = GameMenu;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tile_1 = __webpack_require__(1);
var figure_1 = __webpack_require__(13);
var hud_1 = __webpack_require__(4);
var TilesDemo = (function () {
    function TilesDemo() {
        this.tiles = [];
        this.figures = [];
        this.hud = new hud_1.HUD();
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 20; j++) {
                this.tiles.push(new tile_1.Tile(i, j, 0.1));
            }
        }
        var pattern = [
            ' 9 ',
            '999',
            ' 9',
            '9 9'
        ];
        var pattern2 = [
            '99',
            '9 ',
            '9 '
        ];
        this.figures.push(new figure_1.TileFigure(1, 0, pattern));
        this.figures.push(new figure_1.TileFigure(5, 5, pattern2));
    }
    TilesDemo.prototype.handleKeyboardInput = function (event) {
        if (event.keyCode === 27) {
            document.dispatchEvent(new CustomEvent('gameStateEvent', { detail: -1 }));
        }
        else if (event.keyCode === 38) {
            this.hud.setScore(this.hud.getScore() + 1);
        }
        else if (event.keyCode === 40) {
            this.hud.setScore(this.hud.getScore() - 1);
        }
    };
    TilesDemo.prototype.update = function (timeDelta) {
    };
    TilesDemo.prototype.draw = function (ctx) {
        for (var _i = 0, _a = this.tiles; _i < _a.length; _i++) {
            var tile = _a[_i];
            tile.draw(ctx);
        }
        for (var _b = 0, _c = this.figures; _b < _c.length; _b++) {
            var figure = _c[_b];
            figure.draw(ctx);
        }
        this.hud.draw(ctx);
    };
    return TilesDemo;
}());
exports.TilesDemo = TilesDemo;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/tile.97e31683c169f5b76b84a350142ffe2d.png";

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tile_1 = __webpack_require__(1);
var TileFigure = (function () {
    function TileFigure(x, y, pattern) {
        this.position = { x: x, y: y };
        this.figure = this.parsePattern(pattern);
        this.setPosition(this.position.x, this.position.y);
    }
    TileFigure.prototype.parsePattern = function (pattern) {
        var tiles = [];
        var _loop_1 = function (rowIndex, row) {
            row.split('').forEach(function (item, index) {
                if (RegExp(/^[0-9]$/g).exec(item)) {
                    tiles.push(new tile_1.Tile(index, Number(rowIndex), Number(item) * 0.1));
                }
            });
        };
        for (var _i = 0, _a = Object.entries(pattern); _i < _a.length; _i++) {
            var _b = _a[_i], rowIndex = _b[0], row = _b[1];
            _loop_1(rowIndex, row);
        }
        return tiles;
    };
    TileFigure.prototype.update = function () {
    };
    TileFigure.prototype.draw = function (ctx) {
        for (var _i = 0, _a = this.figure; _i < _a.length; _i++) {
            var tile = _a[_i];
            tile.draw(ctx);
        }
    };
    TileFigure.prototype.setPosition = function (x, y) {
        this.position = { x: x, y: y };
        for (var _i = 0, _a = this.figure; _i < _a.length; _i++) {
            var tile = _a[_i];
            tile.setPosition(tile.getPosition().x + this.position.x, tile.getPosition().y + this.position.y);
        }
    };
    TileFigure.prototype.getPosition = function () {
        return this.position;
    };
    return TileFigure;
}());
exports.TileFigure = TileFigure;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Line = (function () {
    function Line(startX, startY, endX, endY, width, opacity) {
        if (width === void 0) { width = 1; }
        if (opacity === void 0) { opacity = 1; }
        this.startPos = { x: startX, y: startY };
        this.endPos = { x: endX, y: endY };
        this.width = width;
        this.opacity = opacity;
    }
    Line.prototype.update = function () {
    };
    Line.prototype.draw = function (ctx) {
        ctx.save();
        ctx.lineWidth = this.width;
        ctx.globalAlpha = this.opacity;
        ctx.translate(-0.5, 0);
        ctx.moveTo(this.startPos.x, this.startPos.y);
        ctx.lineTo(this.endPos.x, this.endPos.y);
        ctx.stroke();
        ctx.restore();
    };
    return Line;
}());
exports.Line = Line;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(0);
var pop_up_1 = __webpack_require__(16);
var snake_1 = __webpack_require__(18);
var food_1 = __webpack_require__(19);
var tile_background_1 = __webpack_require__(20);
var hud_1 = __webpack_require__(4);
var SPEED_UP_SCORE = 25;
var GameState;
(function (GameState) {
    GameState[GameState["ACTIVE"] = 'ACTIVE'] = "ACTIVE";
    GameState[GameState["PAUSED"] = 'PAUSED'] = "PAUSED";
})(GameState || (GameState = {}));
var SnakeGame = (function () {
    function SnakeGame() {
        this.hud = new hud_1.HUD();
        this.background = new tile_background_1.TileBackground();
        this.screenHitBox = [
            { pos: { x: -2, y: -2 }, size: { w: constants_1.GAME_FIELD_WIDTH * constants_1.TILE_SIZE, h: 1 } },
            { pos: { x: -2, y: -2 }, size: { w: 1, h: constants_1.GAME_FIELD_HEIGHT * constants_1.TILE_SIZE } },
            { pos: { x: constants_1.GAME_FIELD_WIDTH * constants_1.TILE_SIZE + 2, y: -2 }, size: { w: 1, h: constants_1.GAME_FIELD_HEIGHT * constants_1.TILE_SIZE } },
            { pos: { x: -2, y: constants_1.GAME_FIELD_HEIGHT * constants_1.TILE_SIZE + 2 }, size: { w: constants_1.GAME_FIELD_WIDTH * constants_1.TILE_SIZE, h: 1 } },
        ];
        this.init();
    }
    SnakeGame.prototype.handleKeyboardInput = function (event) {
        var isValidInput = false;
        switch (event.keyCode) {
            case 37:// left
                if (this.lastKeyCode != 39) {
                    this.snake.turn(-1, 0);
                    isValidInput = true;
                }
                break;
            case 38:// up
                if (this.lastKeyCode != 40) {
                    this.snake.turn(0, -1);
                    isValidInput = true;
                }
                break;
            case 39:// right
                if (this.lastKeyCode != 37) {
                    this.snake.turn(1, 0);
                    isValidInput = true;
                }
                break;
            case 40:// down
                if (this.lastKeyCode != 38) {
                    this.snake.turn(0, 1);
                    isValidInput = true;
                }
                break;
            case 27:// esc
                document.dispatchEvent(new CustomEvent('gameStateEvent', { detail: -1 }));
                break;
            case 13:// enter
                if (this.gameState === GameState.PAUSED) {
                    this.popup = null;
                    this.init();
                }
                break;
        }
        if (isValidInput) {
            this.lastKeyCode = event.keyCode;
        }
    };
    SnakeGame.prototype.update = function (timeDelta) {
        if (this.gameState === GameState.ACTIVE) {
            // intersections
            if (this.snake.intersects(this.food.getHitBox())) {
                this.score += 5;
                this.hud.setScore(this.score);
                this.replaceFood();
                this.snake.grow();
            }
            for (var _i = 0, _a = this.screenHitBox; _i < _a.length; _i++) {
                var hitBox = _a[_i];
                if (this.snake.intersects(hitBox)) {
                    this.endGame();
                }
            }
            for (var _b = 0, _c = this.snake.getTailHitBoxes(); _b < _c.length; _b++) {
                var hitBox = _c[_b];
                if (this.snake.intersects(hitBox)) {
                    this.endGame();
                }
            }
            this.snake.update(timeDelta);
            if (this.score - this.lastScore >= SPEED_UP_SCORE) {
                var snakeSpeed = this.snake.getSpeed();
                this.snake.setSpeed(snakeSpeed + 1);
                this.hud.setSpeed(snakeSpeed);
                this.lastScore = this.score;
            }
        }
    };
    SnakeGame.prototype.draw = function (ctx) {
        this.background.draw(ctx);
        this.hud.draw(ctx);
        this.food.draw(ctx);
        this.snake.draw(ctx);
        if (this.popup) {
            this.popup.draw(ctx);
        }
    };
    SnakeGame.prototype.init = function () {
        this.score = 0;
        this.lastScore = this.score;
        this.snake = new snake_1.Snake(constants_1.GAME_FIELD_WIDTH / 2, constants_1.GAME_FIELD_HEIGHT / 2);
        this.food = new food_1.Food();
        this.hud.setSpeed(this.snake.getSpeed());
        this.hud.setScore(this.score);
        this.replaceFood();
        this.gameState = GameState.ACTIVE;
    };
    SnakeGame.prototype.replaceFood = function () {
        var exclude = [this.snake.getPosition()].concat(this.snake.getSnakeTilePositions());
        var x = 0;
        var y = 0;
        for (var i = 0; i < constants_1.GAME_FIELD_WIDTH * constants_1.GAME_FIELD_HEIGHT; i++) {
            x = this.getRandomNumber(0, constants_1.GAME_FIELD_WIDTH);
            y = this.getRandomNumber(0, constants_1.GAME_FIELD_HEIGHT);
            if (exclude.filter(function (pos) { return pos.x === x && pos.y === y; }).length <= 0) {
                break;
            }
        }
        this.food.setPosition(x, y);
    };
    SnakeGame.prototype.getRandomNumber = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };
    SnakeGame.prototype.endGame = function () {
        this.gameState = GameState.PAUSED;
        this.snake.setDirection(0, 0);
        this.popup = new pop_up_1.Popup(constants_1.CANVAS_WIDTH / 2, constants_1.CANVAS_HEIGHT / 2, 'Game Over', [
            'Your result: ' + this.score.toString(),
            'Press Enter',
            'to continue...'
        ]);
        this.popup.setState(true);
    };
    return SnakeGame;
}());
exports.SnakeGame = SnakeGame;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(0);
var text_1 = __webpack_require__(2);
var rectangle_1 = __webpack_require__(17);
var SIZE = { w: 180, h: 100 };
var Popup = (function () {
    function Popup(x, y, title, lines) {
        var _this = this;
        this.content = [];
        this.active = true;
        this.position = { x: x - SIZE.w / 2, y: y - SIZE.h / 2 };
        var titleFontSize = 20;
        var lineFontSize = 18;
        var topOffset = 12;
        this.content.push(new text_1.Text(title, this.position.x + (SIZE.w / 2 - (title.length * titleFontSize / 2.3) / 2), this.position.y + topOffset, titleFontSize));
        lines.forEach(function (line, index) {
            _this.content.push(new text_1.Text(line, _this.position.x + (SIZE.w / 2 - (line.length * lineFontSize / 2.3) / 2), _this.position.y + topOffset * 2 + titleFontSize + lineFontSize * index + 8, lineFontSize));
        });
        this.background = new rectangle_1.Rectangle(this.position.x, this.position.y, SIZE.w, this.content.length * titleFontSize + topOffset * 4, 3, constants_1.MAIN_COLOR);
    }
    Popup.prototype.update = function () {
    };
    Popup.prototype.draw = function (ctx) {
        if (!this.active)
            return;
        this.background.draw(ctx);
        for (var _i = 0, _a = this.content; _i < _a.length; _i++) {
            var line = _a[_i];
            line.draw(ctx);
        }
    };
    Popup.prototype.setState = function (state) {
        this.active = state;
    };
    return Popup;
}());
exports.Popup = Popup;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Rectangle = (function () {
    function Rectangle(x, y, w, h, lineWidth, fillStyle, strokeStyle) {
        if (lineWidth === void 0) { lineWidth = 3; }
        if (fillStyle === void 0) { fillStyle = 'black'; }
        if (strokeStyle === void 0) { strokeStyle = 'black'; }
        this.position = { x: x, y: y };
        this.size = { w: w, h: h };
        this.lineWidth = lineWidth;
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
    }
    Rectangle.prototype.update = function () {
    };
    Rectangle.prototype.draw = function (ctx) {
        ctx.save();
        ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = this.fillStyle;
        ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h);
        ctx.restore();
        ctx.save();
        ctx.strokeStyle = this.strokeStyle;
        ctx.strokeRect(this.position.x, this.position.y, this.size.w, this.size.h);
        ctx.restore();
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var tile_1 = __webpack_require__(1);
var border_box_1 = __webpack_require__(5);
var constants_1 = __webpack_require__(0);
var QUEUE_LENGTH = 2;
var TAIL_OPACITY = 0.8;
var CLOCK_RESET_TIME = 1;
var Snake = (function (_super) {
    __extends(Snake, _super);
    function Snake(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var _this = _super.call(this) || this;
        _this.tail = [];
        _this.clock = 0;
        _this.speed = 1;
        _this.head = new tile_1.Tile(x, y);
        _this.hitBox.size = _this.head.getSize();
        _this.position = { x: x, y: y };
        _this.hitBox.pos = _this.position;
        _this.direction = { x: 0, y: 0 };
        return _this;
    }
    Snake.prototype.update = function (timeDelta) {
        this.clock += timeDelta * this.speed;
        if (this.clock > CLOCK_RESET_TIME) {
            this.move();
            this.clock = 0;
        }
    };
    Snake.prototype.draw = function (ctx) {
        for (var _i = 0, _a = this.tail; _i < _a.length; _i++) {
            var part = _a[_i];
            part.draw(ctx);
        }
        this.head.draw(ctx);
    };
    Snake.prototype.turn = function (x, y) {
        this.setDirection(x, y);
        this.move();
        this.clock = 0;
    };
    Snake.prototype.move = function () {
        this.setPosition(this.position.x + 1 * this.direction.x, this.position.y + 1 * this.direction.y);
        this.updatePosition();
    };
    Snake.prototype.grow = function () {
        this.tail.push(new tile_1.Tile(-1 * constants_1.TILE_SIZE, -1 * constants_1.TILE_SIZE, TAIL_OPACITY));
    };
    Snake.prototype.setPosition = function (x, y) {
        this.position = { x: x, y: y };
        this.hitBox.pos = {
            x: this.position.x * constants_1.TILE_SIZE,
            y: this.position.y * constants_1.TILE_SIZE
        };
    };
    Snake.prototype.getPosition = function () {
        return this.position;
    };
    Snake.prototype.setDirection = function (x, y) {
        this.direction = { x: x, y: y };
    };
    Snake.prototype.getDirection = function () {
        return this.direction;
    };
    Snake.prototype.getSpeed = function () {
        return this.speed;
    };
    Snake.prototype.setSpeed = function (value) {
        this.speed = value;
    };
    Snake.prototype.getHitBox = function () {
        return { pos: this.position, size: this.head.getSize() };
    };
    Snake.prototype.getTailHitBoxes = function () {
        return this.tail.map(function (e) { return ({
            pos: e.getRealPosition(),
            size: e.getSize()
        }); });
    };
    Snake.prototype.getSnakeTilePositions = function () {
        var result = this.tail.map(function (e) { return e.getPosition(); });
        result.unshift(this.head.getPosition());
        return result;
    };
    Snake.prototype.updatePosition = function () {
        if (!this.direction.x && !this.direction.y)
            return;
        var headLastPos = this.head.getPosition();
        if (this.tail.length > 0) {
            for (var i = this.tail.length - 1; i > 0; i--) {
                var nextPos = this.tail[i - 1].getPosition();
                this.tail[i].setPosition(nextPos.x, nextPos.y);
            }
            this.tail[0].setPosition(headLastPos.x, headLastPos.y);
        }
        this.head.setPosition(this.position.x, this.position.y);
    };
    return Snake;
}(border_box_1.BorderBox));
exports.Snake = Snake;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var tile_1 = __webpack_require__(1);
var border_box_1 = __webpack_require__(5);
var FOOD_OPACITY = 0.5;
var Food = (function (_super) {
    __extends(Food, _super);
    function Food() {
        var _this = _super.call(this) || this;
        _this.tile = new tile_1.Tile(0, 0, FOOD_OPACITY);
        _this.hitBox = { pos: _this.tile.getRealPosition(), size: _this.tile.getSize() };
        return _this;
    }
    Food.prototype.update = function (timeDelta) {
    };
    Food.prototype.draw = function (ctx) {
        this.tile.draw(ctx);
    };
    Food.prototype.setPosition = function (x, y) {
        this.tile.setPosition(x, y);
        this.hitBox.pos = this.tile.getRealPosition();
    };
    Food.prototype.getPosition = function () {
        return this.tile.getPosition();
    };
    return Food;
}(border_box_1.BorderBox));
exports.Food = Food;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(0);
var tile_1 = __webpack_require__(1);
var TileBackground = (function () {
    function TileBackground(opacity) {
        if (opacity === void 0) { opacity = 0.1; }
        this.background = [];
        this.opacity = opacity;
        for (var w = 0; w < constants_1.GAME_FIELD_WIDTH; w++) {
            for (var h = 0; h < constants_1.GAME_FIELD_HEIGHT; h++) {
                this.background.push(new tile_1.Tile(w, h, this.opacity));
            }
        }
    }
    TileBackground.prototype.update = function (deltaTime) {
    };
    TileBackground.prototype.draw = function (ctx) {
        for (var _i = 0, _a = this.background; _i < _a.length; _i++) {
            var tile = _a[_i];
            tile.draw(ctx);
        }
    };
    return TileBackground;
}());
exports.TileBackground = TileBackground;


/***/ }),
/* 21 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map