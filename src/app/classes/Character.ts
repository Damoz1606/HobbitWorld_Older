import { Physics, Scene } from "phaser";

export abstract class Character extends Physics.Arcade.Sprite {

    private health!: number;
    
    protected abstract initAnimations(): void;
    public abstract update(): void;
    public abstract takeDamage(value: number): void;

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
        this.initAnimations();
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

    protected checkFlip(): void {
        if(this.getBody().velocity.x < 0) {
            this.scaleX = -1 * Math.abs(this.scaleX);
        } else {
            this.scaleX = Math.abs(this.scaleX);
        }
    }
}