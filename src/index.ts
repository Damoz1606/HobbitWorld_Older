import { Game } from "phaser";
import { GameConfig } from "./config/config";
import { GameMainState } from "./lib/GameMainState";

document.title = "Hobbit World";

GameMainState.instance().game = new Game(GameConfig);