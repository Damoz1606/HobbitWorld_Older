import { Game } from "phaser";
import { GameConfig } from "./config/config";
import { GameMainState } from "./lib/GameMainState";

document.title = "Hobbit World";

GameMainState.instance().sizeChanged = () => {
    if (GameMainState.instance().game.isBooted) {
        setTimeout(() => {
            GameMainState.instance().game.scale.resize(window.innerWidth, window.innerHeight);
            GameMainState.instance().game.scale.canvas.setAttribute(
                "style",
                `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`
            );
        }, 100);
    }
}

window.onresize = GameMainState.instance().sizeChanged;

GameMainState.instance().game = new Game(GameConfig);