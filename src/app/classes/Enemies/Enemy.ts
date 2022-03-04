import { Character } from "../Character";
import { Player } from "../Player/Player";

export abstract class Enemy extends Character {

    constructor(
        scene: Phaser.Scene, 
        x: number, 
        y: number, 
        texture: string, 
        private target: Player,
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
}