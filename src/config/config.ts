import { Types } from "phaser";

export const GameConfig: Types.Core.GameConfig = {
    title: "Hobbit World",
    type: Phaser.AUTO,
    parent: "root",
    backgroundColor: 0x000000,
    scale: {
        mode: Phaser.Scale.ScaleModes.NONE,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
        }
    },
    render: {
        antialiasGL: false,
        pixelArt: true,
    },
    callbacks: {
        postBoot: () => {}
    },
    canvasStyle: `display: block; width: 100%; height: 100%;`,
    autoFocus: true,
    audio: {
        disableWebAudio: false,
    },
    scene: []
}