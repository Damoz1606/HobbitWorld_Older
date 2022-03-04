import { Scene } from "phaser";
import { Player } from "../classes/Player/Player";

export class LevelOne extends Scene {
    constructor(
        private player: Player,
    ) {
        super({ key: "LevelOne" });
    }

    create(): void {
        this.player = new Player(this, 100, 100, "hobbit");
        // this.scene.start("Game");
    }

    update = () => {
        this.player.update();
    }
}