import Phaser from "phaser";
import GameScene_Level_1 from "./GameScene_Level_1";
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
            debug: false
        }
    },
    pixelArt: true,
    scene: [GameScene_Level_1, PreloadScene],
};

export {config}
