import Phaser from "phaser";
import GameScene from "./GameScene";
import PreloadScene from "./PreloadScene";

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 960,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: { y: 300 },
            debug: true
        }
    },
    pixelArt: true,
    scene: [GameScene, PreloadScene],
};

export {config}
