import { Player } from "../Player/Player";
import { Enemy } from "./Enemy";
import { EnemyAgressiveRadius, EnemyAttackRadius, EnemyVelocity } from "./EnemyType";

export class CryingBud extends Enemy {

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        target: Player,
        frame?: string | number) {
        super(scene, x, y, texture, target, { x: EnemyVelocity.CryingBud, y: 0 }, frame);
        this.scale = 2.25;
        this.setAgressiveRadius(EnemyAgressiveRadius.CryingBud);
        this.setAttackRadius(EnemyAttackRadius.CryingBud);
    }

    protected preUpdate(): void {
        if (this.velocity) {
            this.getBody().setVelocityX(this.velocity.x);
            this.getBody().setVelocityY(this.velocity.y);
        }
        if(this.getBody().blocked.left) {
            this.getBody().setOffset(0, 0);
        } else if (this.getBody().blocked.right) {
            this.getBody().setOffset(15, 0);
        }
        this.bounceHandler();
        this.followTarget();
    }

    protected initAnimations(): void {
        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNames('crying-bud', {
                prefix: 'tile',
                suffix: '.png',
                start: 311,
                end: 314
            }),
            frameRate: 10,
            repeat: -1
        });
    }

    update(): void {
        this.animate();
    }

    animate(): void {
        !this.anims.isPlaying && this.anims.play('walk', true);
    }

    public setMovementOrientation(horizontal: boolean) {
        if (horizontal) {
            this.velocity = { x: 100, y: 0 };
        } else {
            this.velocity = { x: 0, y: 100 };
        }
    }

}