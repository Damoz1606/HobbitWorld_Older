import { Player } from "../Player/Player";
import { Enemy } from "./Enemy";

export class Phatom extends Enemy {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        target: Player,
        frame?: string | number) {
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
                prefix: 'tile',
                suffix: '.png',
                start: 183,
                end: 190
            }),
            frameRate: 10,
            repeat: -1
        });
    }

    protected attackHandler(): void {
    }
    
    public takeDamage(value: number): void {
    }
}