import { Scene, Tilemaps } from "phaser";
import { Enemy } from "../classes/Enemies/Enemy";
import { EnemyFactory } from "../classes/Enemies/EnemyFactory";
import { EnemyType } from "../classes/Enemies/EnemyType";
import { Player } from "../classes/Player/Player";
import { gameObjectToObjectPoints } from "../lib/GameObjectToObjectPoints";

export class LevelOne extends Scene {
    constructor(
        private player: Player,
        private enemies: Enemy[],
        private map: Tilemaps.Tilemap,
        private tileset: Tilemaps.Tileset,
        private world: Tilemaps.TilemapLayer,
        private trees: Tilemaps.TilemapLayer,
        private ground: Tilemaps.TilemapLayer,
        private border: Tilemaps.TilemapLayer,
        private water: Tilemaps.TilemapLayer,
    ) {
        super({ key: "LevelOne" });
    }

    create(): void {
        this.initMap();
        this.initPlayer();
        this.initEnemies();
        this.initCamera();
        
        this.physics.add.collider(this.player, this.trees);
        this.physics.add.collider(this.player, this.border);
    }

    update = () => {
        this.player.update();
        // this.enemy.update();
    }

    private initMap(): void {
        this.map = this.make.tilemap({ key: "base_world" });
        this.tileset = this.map.addTilesetImage("Serene_Village_16x16", "base_tiles");
        this.world = this.map.createLayer("WorldBorder", this.tileset, 0, 0);
        this.ground = this.map.createLayer("Plain", this.tileset, 0, 0);
        this.trees = this.map.createLayer("Trees", this.tileset, 0, 0);
        this.border = this.map.createLayer("PlainBorder", this.tileset, 0, 0);
        this.water = this.map.createLayer("Water", this.tileset, 0, 0);
        this.physics.world.setBounds(0, 0, this.world.width, this.world.height);

        this.trees.setCollisionByProperty({ collision: true });
        this.border.setCollisionByProperty({ collision: true });
        this.world.setCollisionByProperty({ collision: true });
        this.water.setCollisionByProperty({ collision: true });
        this.showDebugItems();
    }

    private initPlayer():void {
        const spawnPoints = gameObjectToObjectPoints(
            this.map.filterObjects("Spawn", (obj: any) => obj.name === "Spawn")
        );
        this.player = new Player(this, spawnPoints[0].x, spawnPoints[0].y, "hobbit");
    }

    private initEnemies(): void {
        const cryingBudHorizontal = gameObjectToObjectPoints(
            this.map.filterObjects("Enemies", (obj: any) => obj.name === "CryingBud" && obj.type === "Horizontal")
        );
        const cryingBudVertical = gameObjectToObjectPoints(
            this.map.filterObjects("Enemies", (obj: any) => obj.name === "CryingBud" && obj.type === "Vertical")
        );

        this.enemies = cryingBudHorizontal.map((enemyPoint: any) => EnemyFactory.create(this, enemyPoint.x, enemyPoint.y, EnemyType.CryingBud, this.player));
        this.enemies.concat(cryingBudVertical.map((enemyPoint: any) => {
            const enemy = EnemyFactory.create(this, enemyPoint.x, enemyPoint.y, EnemyType.CryingBud, this.player);
            enemy.setMovementOrientation(false);
            return enemy;
        }));

        this.physics.add.collider(this.enemies, this.enemies);
        this.physics.add.collider(this.enemies, this.trees);
        this.physics.add.collider(this.enemies, this.border);
        this.physics.add.collider(this.enemies, this.world);
        this.physics.add.collider(this.player, this.enemies, (playerObject, enemyObject) => {
           (enemyObject as Enemy).attackTarget();
        }, undefined, this);
    }

    private showDebugItems(): void {
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        this.trees.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
        });
        this.border.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
        });
        this.water.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
        });
        this.world.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
        });
    }

    private initCamera(): void {
        this.cameras.main.setSize(this.game.scale.width, this.game.scale.height);
        this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
        this.cameras.main.setZoom(3);
    }
}