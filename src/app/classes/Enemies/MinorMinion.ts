import { Player } from "../Player/Player";
import { Enemy } from "./Enemy";

export class MinorMinion extends Enemy {

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, target: Player, frame?: string | number) {
        super(scene, x, y, texture, target, {x: 100, y: 0}, frame);
        this.scale = 2.25;
    }

    protected preUpdate(): void {
        this.getBody().setVelocityX(200);
    }

    public update(): void {
        this.anims.play('walk', true);
    }

    protected initAnimations(): void {
        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNames('minor-minion', {
                prefix: 'tile0',
                suffix: '.png',
                start: 87,
                end: 94
            }),
            frameRate: 10,
            repeat: -1
        });
    }
}