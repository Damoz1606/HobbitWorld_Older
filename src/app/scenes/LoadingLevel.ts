import { Scene } from "phaser";

export class LoadingLevel extends Scene {
    constructor() {
        super({ key: "LoadingLevel" });
    }
    
    preload(): void {
        this.load.baseURL = 'assets/images/';
        this.load.atlas('hobbit', 'sprites/hobbit/Hobbit-0.png', 'sprites/hobbit/Hobbit.json');
        this.load.atlas('crying-bud', 'sprites/enemy/CryingBud.png', 'sprites/enemy/CryingBud.json');
        this.load.atlas('crying-water-bud', 'sprites/enemy/CryingWaterBud.png', 'sprites/enemy/CryingWaterBud.json');
        this.load.atlas('minor-minion', 'sprites/enemy/minorMinion.png', 'sprites/enemy/minorMinion.json');
        this.load.atlas('phantom', 'sprites/enemy/Phatom.png', 'sprites/enemy/Phatom.json');
        this.load.atlas('slime-brown', 'sprites/enemy/SlimeBrown.png', 'sprites/enemy/SlimeBrown.json');
        this.load.atlas('slime-green', 'sprites/enemy/SlimeGreen.png', 'sprites/enemy/SlimeGreen.json');
    }
    
    create(): void {
        this.scene.start("LevelOne");
    }
}