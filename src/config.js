import Phaser from "phaser";
import GameScene_Level_1 from "./GameScene_Level_1";
import GameScene_Level_2 from "./GameScene_Level_2";
import GameScene_Level_3 from "./GameScene_Level_3";
import PreloadScene from "./PreloadScene";
import GameScene_Level_4 from "./GameScene_Level_4";
import CutSceneFirstSock from "./CutSceneFirstSock";

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
    // scene: [GameScene_Level_1, PreloadScene, GameScene_Level_4, GameScene_Level_3, GameScene_Level_2, CutSceneFirstSock ],
    // scene: [GameScene_Level_2, PreloadScene, GameScene_Level_4, GameScene_Level_3, GameScene_Level_1, CutSceneFirstSock ],
    scene: [GameScene_Level_4, PreloadScene, GameScene_Level_1, GameScene_Level_3, GameScene_Level_2, CutSceneFirstSock ],
    // scene: [CutSceneFirstSock, GameScene_Level_4, PreloadScene, GameScene_Level_1, GameScene_Level_3, GameScene_Level_2  ],
};

export {config}
