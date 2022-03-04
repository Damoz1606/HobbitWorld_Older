import { Player } from "../Player/Player";
import { Enemy } from "./Enemy";

export class SlimeGreen extends Enemy {

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        target: Player, frame?: string | number) {
        super(scene, x, y, texture, target, {x: 100, y: 0}, frame);
        this.scale = 2.25;
    }

    protected preUpdate(): void {
        this.getBody().setVelocityX(200);
    }

    protected initAnimations(): void {
        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNames('slime-green', {
                prefix: 'tile',
                suffix: '.png',
                start: 251,
                end: 254
            }),
            frameRate: 10,
            repeat: -1
        });
    }

    public update(): void {
        !this.anims.isPlaying && this.anims.play('walk', true);
    }
}