import { Physics, Scene } from "phaser";

export abstract class Character extends Physics.Arcade.Sprite {

    private health!: number;
    protected abstract initAnimations(): void;

    constructor(
        scene: Scene, 
        x:number,
        y:number,
        texture: string,
        frame?: string | number,
        health?: number
    ) {
        super(scene, x, y, texture, frame);

        this.health = health || 100;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.getBody().setCollideWorldBounds(true);
    }

    public getBody(): Physics.Arcade.Body {
        return this.body as Physics.Arcade.Body;
    }

    public getHealth(): number {
        return this.health;
    }

    public setHealth(value: number): void {
        this.health = value;
    }

    public isDead(): boolean {
        return this.health <= 0;
    }

    public getDamage(value?: number): void {
        this.scene.tweens.add({
            targets: this,
            duration: 100,
            repeat: 3,
            yoyo: true,
            alpha: 0.5,
            onStart: () => {
                if (value) {
                    this.setDamage(value);
                }
            },
            onComplete: () => {
                this.setAlpha(1);
            }
        });
    }

    private setDamage(value: number): void {
        this.health = this.health - value;
    }

    protected checkFlip(): void {
        if(this.getBody().velocity.x < 0) {
            this.scaleX = -1;
        } else {
            this.scaleX = 1;
        }
    }
}