import { Math as MathPhaser } from "phaser";
import { Player } from "../Player/Player";
import { Enemy } from "./Enemy";
import { EnemyAgressiveRadius, EnemyAttackRadius, EnemyDamage, EnemyHealth, EnemyVelocity } from "./EnemyType";

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

        this.setHealth(EnemyHealth.CryingBud);
        this.setDamage(EnemyDamage.CryingBud);
        this.setAgressiveRadius(EnemyAgressiveRadius.CryingBud);
        this.setAttackRadius(EnemyAttackRadius.CryingBud);

        this.scene.time.addEvent({
            delay: 5000,
            callback: () => {
                this.getTarget().takeDamage(this.getDamage());
            },
            callbackScope: this,
        });
    }

    protected preUpdate(): void {
        this.animate();
        if (this.velocity) {
            this.getBody().setVelocityX(this.velocity.x);
            this.getBody().setVelocityY(this.velocity.y);
        }
        if (this.getBody().blocked.left) {
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

    public update(): void {
        this.animate();
    }

    private animate(): void {
        !this.anims.isPlaying && this.anims.play('walk', true);
    }

    protected attackHandler(): void {
        if (MathPhaser.Distance.BetweenPoints(
            { x: this.x, y: this.y },
            { x: this.getTarget().x, y: this.getTarget().y }
        ) <= this.getTarget().getAttackRadius()) {
            this.tweens();
            this.takeDamage(this.getTarget().getDamage());
            // this.getTarget().takeDamage(this.getDamage());
        }
    }

    public takeDamage(value: number): void {
        this.setHealth(this.getHealth() - value);
        if (this.getHealth() <= 0) {
            this.destroy();
        }
    }

}