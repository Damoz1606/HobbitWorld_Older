import { Math as MathPhaser} from "phaser";
import { Character } from "../Character";
import { Player } from "../Player/Player";

export abstract class Enemy extends Character {

    constructor(
        scene: Phaser.Scene, 
        x: number, 
        y: number, 
        texture: string, 
        private target: Player,
        protected velocity?: { x: number, y: number },
        frame?: string | number) {
        super(scene, x, y, texture, frame, 30);
    }

    protected abstract preUpdate(): void;

    public setTarget(target: Player): void {
        this.target = target;
    }

    public getTarget(): Player {
        return this.target;
    }

    protected bounceHandler() {
        if (this.velocity) {
            if (this.getBody().blocked.left) {
                this.velocity.x = Math.abs(this.getBody().velocity.x)
            }
            if (this.getBody().blocked.right) {
                
                this.velocity.x = -Math.abs(this.getBody().velocity.x)
            }
            if (this.getBody().blocked.up) {
                this.velocity.y = Math.abs(this.getBody().velocity.y)
            }
            if (this.getBody().blocked.down) {
                this.velocity.y = -Math.abs(this.getBody().velocity.y)
            }
        }
        this.checkFlip();
    }

    protected followTarget() {
        if (MathPhaser.Distance.BetweenPoints(
            { x: this.x, y: this.y },
            { x: this.target.x, y: this.target.y }
        ) < this.target.width) {
            this.getBody().setVelocityX(this.target.x - this.x);
            this.getBody().setVelocityY(this.target.y - this.y);
        } else {
            this.velocity && 
            this.getBody().setVelocityX(this.velocity.x) &&
            this.getBody().setVelocityY(this.velocity.y);
        }
    }
}