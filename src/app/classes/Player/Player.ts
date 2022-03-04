import { Character } from "../Character";

export class Player extends Character {

    private velocity = { x: 125, y: 125 };
    private attackRadius = 100;

    private keyUp: Phaser.Input.Keyboard.Key;
    private keyDown: Phaser.Input.Keyboard.Key;
    private keyLeft: Phaser.Input.Keyboard.Key;
    private keyRight: Phaser.Input.Keyboard.Key;
    private keyAttack: Phaser.Input.Keyboard.Key;
    private keyDefense: Phaser.Input.Keyboard.Key;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame, 30);

        this.keyUp = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyDown = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keyLeft = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyRight = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.keyAttack = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyDefense = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);

        this.scale = 2;
        this.getBody().setSize(20, 20);
        this.getBody().setOffset(20, 20);
    }

    initAnimations(): void {
        const frameRate = 17;
        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNames('hobbit', {
                prefix: 'Hobbit - Idle',
                suffix: '.png',
                start: 1,
                end: 4
            }),
            frameRate: 10,
        });
        this.scene.anims.create({
            key: 'attack',
            frames: this.scene.anims.generateFrameNames('hobbit', {
                prefix: 'Hobbit - attack',
                suffix: '.png',
                start: 1,
                end: 17
            }),
            frameRate: 10,
        });
        this.scene.anims.create({
            key: 'defense',
            frames: this.scene.anims.generateFrameNames('hobbit', {
                prefix: 'Hobbit - block',
                suffix: '.png',
                start: 1,
                end: 13
            }),
            frameRate: 10,
        });
        this.scene.anims.create({
            key: 'death',
            frames: this.scene.anims.generateFrameNames('hobbit', {
                prefix: 'Hobbit - death',
                suffix: '.png',
                start: 1,
                end: 12
            }),
            frameRate: frameRate,
        });
        this.scene.anims.create({
            key: 'hit',
            frames: this.scene.anims.generateFrameNames('hobbit', {
                prefix: 'Hobbit - hit',
                suffix: '.png',
                start: 1,
                end: 4
            }),
            frameRate: frameRate,
        });
        this.scene.anims.create({
            key: 'jump',
            frames: this.scene.anims.generateFrameNames('hobbit', {
                prefix: 'Hobbit - jumpt',
                suffix: '.png',
                start: 1,
                end: 10
            }),
            frameRate: frameRate,
        });
        this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNames('hobbit', {
                prefix: 'Hobbit - run',
                suffix: '.png',
                start: 1,
                end: 10
            }),
            frameRate: frameRate,
        });
        this.scene.anims.create({
            key: 'stop',
            frames: this.scene.anims.generateFrameNames('hobbit', {
                prefix: 'Hobbit - stop',
                suffix: '.png',
                start: 1,
                end: 8
            }),
            frameRate: frameRate,
        });
    }

    update(): void {
        this.getBody().setVelocity(0);
        this.actions();
        this.animate();
    }

    animate(): void {
        if (this.keyUp.isDown ||
            this.keyDown.isDown ||
            this.keyLeft.isDown ||
            this.keyRight.isDown) {
            this.anims.currentAnim.key !== 'run' && this.anims.stop();
            !this.anims.isPlaying && this.anims.play('run', true);
        } else if (this.keyAttack?.isDown) {
            this.anims.currentAnim.key !== 'attack' && this.anims.stop();
            !this.anims.isPlaying && this.anims.play('attack', true);
        } else if (this.keyDefense?.isDown) {
            this.anims.currentAnim.key !== 'defense' && this.anims.stop();
            !this.anims.isPlaying && this.anims.play('defense', true);
        }
        !this.anims.isPlaying && this.anims.play('idle', true);
    }

    actions(): void {
        if (this.keyUp?.isDown) {
            this.getBody().setVelocityY(-this.velocity.y);
        } else if (this.keyDown?.isDown) {
            this.getBody().setVelocityY(this.velocity.y);
        } else if (this.keyLeft?.isDown) {
            this.getBody().setOffset(40, 20);
            this.getBody().setVelocityX(-this.velocity.x);
            this.checkFlip();
        } else if (this.keyRight?.isDown) {
            this.getBody().setOffset(20, 20);
            this.getBody().setVelocityX(this.velocity.x);
            this.checkFlip();
        }
    }
}