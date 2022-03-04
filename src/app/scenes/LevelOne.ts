import { Scene } from "phaser";
import { Enemy } from "../classes/Enemies/Enemy";
import { MinorMinion } from "../classes/Enemies/MinorMinion";
import { Player } from "../classes/Player/Player";

export class LevelOne extends Scene {
    constructor(
        private player: Player,
        private enemy: MinorMinion
    ) {
        super({ key: "LevelOne" });
    }

    create(): void {
        this.player = new Player(this, 100, 100, "hobbit");
        this.enemy = new MinorMinion(this, 100, 100, "minor-minion", this.player);
        // this.scene.start("Game");
    }

    update = () => {
        this.player.update();
        this.enemy.update();
    }
}