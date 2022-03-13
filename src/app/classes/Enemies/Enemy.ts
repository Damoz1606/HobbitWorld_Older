import { Math as MathPhaser } from "phaser";
import { PlayerEvent } from "../../lib/Event";
import { Character } from "../Character";
import { Player } from "../Player/Player";

export abstract class Enemy extends Character {

    private agressiveRadius!: number;
    private attackRadius!: number;
    private damage!: number;

    protected abstract preUpdate(): void;
    protected abstract attackHandler(): void;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        private target: Player,
        protected velocity?: { x: number, y: number },
        frame?: string | number) {
        super(scene, x, y, texture, frame, 30);
        this.scene.game.events.on(PlayerEvent.ATTACK, this.attackHandler, this);
        // this.on('destroy', () => {
        //     this.scene.game.events.removeListener(PlayerEvent.ATTACK, this.attackHandler);
        // });
    }

    public setTarget(target: Player): void {
        this.target = target;
    }

    public getTarget(): Player {
        return this.target;
    }

    protected followTarget() {
        if (MathPhaser.Distance.BetweenPoints(
            { x: this.x, y: this.y },
            { x: this.target.x, y: this.target.y }
        ) < this.agressiveRadius) {
            this.getBody().setVelocityX(this.target.x - this.x);
            this.getBody().setVelocityY(this.target.y - this.y);
        } else {
            this.velocity &&
                this.getBody().setVelocityX(this.velocity.x) &&
                this.getBody().setVelocityY(this.velocity.y);
        }
        this.checkFlip();
    }

    protected getAgressiveRadius(): number {
        return this.agressiveRadius;
    }

    protected setAgressiveRadius(agressiveRadius: number): void {
        this.agressiveRadius = agressiveRadius;
    }

    protected getAttackRadius(): number {
        return this.attackRadius;
    }

    protected setAttackRadius(attackRadius: number): void {
        this.attackRadius = attackRadius;
    }

    public getDamage(): number {
        return this.damage;
    }

    public setDamage(damage: number): void {
        this.damage = damage;
    }

    public bounce() {
        if (this.velocity) {
            if (this.velocity.x < 0) {
                this.velocity.x = Math.abs(this.getBody().velocity.x)
            }
            if (this.velocity.x > 0) {
                this.velocity.x = -Math.abs(this.getBody().velocity.x)
            }
            if (this.velocity.y < 0) {
                this.velocity.y = Math.abs(this.getBody().velocity.y)
            }
            if (this.velocity.y > 0) {
                this.velocity.y = -Math.abs(this.getBody().velocity.y)
            }
        }
        this.checkFlip();
    }

    public setMovementOrientation(horizontal: boolean) {
        if (horizontal) {
            this.velocity = { x: 100, y: 0 };
        } else {
            this.velocity = { x: 0, y: 100 };
        }
    }

    public attackTarget() {
        this.target.takeDamage(this.damage);
    }
}