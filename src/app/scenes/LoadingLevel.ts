import { Scene } from "phaser";

export class LoadingLevel extends Scene {
    constructor() {
        super({ key: "LoadingLevel" });
    }
    
    preload(): void {
        this.load.baseURL = 'assets/images/';
        this.load.atlas('hobbit', 'sprites/hobbit/Hobbit-0.png', 'sprites/hobbit/Hobbit.json');
        // this.load.image("background", "assets/background.png");
        // this.load.image("ground", "assets/ground.png");
        // this.load.image("star", "assets/star.png");
        // this.load.image("bomb", "assets/bomb.png");
        // this.load.spritesheet("dude", "assets/dude.png", {
        // frameWidth: 32,
        // frameHeight: 48
        // });
        // this.load.spritesheet("baddie", "assets/baddie.png", {
        // frameWidth: 32,
        // frameHeight: 32
        // });
        // this.load.spritesheet("explosion", "assets/explosion.png", {
        // frameWidth: 32,
        // frameHeight: 32
        // });
        // this.load.audio("jump", "assets/jump.wav");
        // this.load.audio("explosion", "assets/explosion.wav");
        // this.load.audio("music", "assets/music.mp3");
    }
    
    create(): void {
        this.scene.start("LevelOne");
    }
}