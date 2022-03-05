import { Scene } from "phaser";
import { Enemy } from "../classes/Enemies/Enemy";
import { EnemyFactory } from "../classes/Enemies/EnemyFactory";
import { EnemyType } from "../classes/Enemies/EnemyType";
import { Player } from "../classes/Player/Player";

export class LevelOne extends Scene {
    constructor(
        private player: Player,
        private enemy: Enemy
    ) {
        super({ key: "LevelOne" });
    }

    create(): void {
        this.player = new Player(this, 100, 100, "hobbit");
        this.enemy = EnemyFactory.create(this, 200, 200, EnemyType.CryingBud, this.player);
        // this.scene.start("Game");
    }

    update = () => {
        this.player.update();
        // this.enemy.update();
    }
}