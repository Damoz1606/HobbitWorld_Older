import { Scene } from "phaser";

export class LoadingLevel extends Scene {
    constructor() {
        super({ key: "LoadingLevel" });
    }
    
    preload(): void {
        this.load.baseURL = 'assets/images/';
        this.load.atlas('hobbit', 'sprites/hobbit/Hobbit-0.png', 'sprites/hobbit/Hobbit.json');
        this.load.atlas('minor-minion', 'sprites/enemy/minorMinion.png', 'sprites/enemy/minorMinion.json');
    }
    
    create(): void {
        this.scene.start("LevelOne");
    }
}