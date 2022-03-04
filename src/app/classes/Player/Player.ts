import { Character } from "../Character";

export class Player extends Character {

    private keyUp: Phaser.Input.Keyboard.Key;
    private keyDown: Phaser.Input.Keyboard.Key;
    private keyLeft: Phaser.Input.Keyboard.Key;
    private keyRight: Phaser.Input.Keyboard.Key;
    private keyAttack: Phaser.Input.Keyboard.Key;
    private keyDefense: Phaser.Input.Keyboard.Key;
    private keyRun: Phaser.Input.Keyboard.Key;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame, 30);

        this.keyUp = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyDown = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keyLeft = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyRight = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.keyAttack = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyDefense = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
        this.keyRun = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        this.getBody().setSize(30, 30);
        this.getBody().setOffset(8, 0);

        this.initAnimations();
    }

    initAnimations(): void {
        const frameRate = 8;
        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNames('hobbit', {
                prefix: 'Hobbit - Idle',
                end: 4
            }),
            frameRate: frameRate,
        });
        this.scene.anims.create({
            key: 'attack',
            frames: this.scene.anims.generateFrameNames('hobbit', {
                prefix: 'Hobbit - attack',
                end: 17
            }),
            frameRate: frameRate,
        });
        this.scene.anims.create({
            key: 'defense',
            frames: this.scene.anims.generateFrameNames('hobbit', {
                prefix: 'Hobbit - block',
                end: 13
            }),
            frameRate: frameRate,
        });
        this.scene.anims.create({
            key: 'death',
            frames: this.scene.anims.generateFrameNames('hobbit', {
                prefix: 'Hobbit - death',
                end: 12
            }),
            frameRate: frameRate,
        });
        this.scene.anims.create({
            key: 'hit',
            frames: this.scene.anims.generateFrameNames('hobbit', {
                prefix: 'Hobbit - hit',
                end: 4
            }),
            frameRate: frameRate,
        });
        this.scene.anims.create({
            key: 'jump',
            frames: this.scene.anims.generateFrameNames('hobbit', {
                prefix: 'Hobbit - jumpt',
                end: 10
            }),
            frameRate: frameRate,
        });
        this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNames('hobbit', {
                prefix: 'Hobbit - run',
                end: 10
            }),
            frameRate: frameRate,
        });
        this.scene.anims.create({
            key: 'stop',
            frames: this.scene.anims.generateFrameNames('hobbit', {
                prefix: 'Hobbit - stop',
                end: 8
            }),
            frameRate: frameRate,
        });

        // this.scene.anims.create({
        //     key: 'defense',
        //     frames: this.scene.anims.generateFrameNames('hobbit', {
        //         prefix: 'Hobbit - block',
        //         end: 13
        //     }),
        //     frameRate: frameRate,
        // });
    }
}