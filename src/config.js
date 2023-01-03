import Phaser from "phaser";
import GameScene from "./scenes/GameScene";
import CreditScene from "./scenes/menu/CreditScene";
import OptionScene from "./scenes/menu/OptionScene";
import MenuScene from "./scenes/menu/MenuScene";

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: { y: 300 },
            debug: true
        }
    },
    scene: [MenuScene, GameScene, OptionScene, CreditScene]
};

export {config}
