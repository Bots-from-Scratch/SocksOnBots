import Phaser from 'phaser';
import css from "./style.css";

import {JavaScript} from "blockly";
import GameScene_Level_1 from "./GameScene_Level_1";
import {toolboxJson} from "./blockly/toolbox_phaser";
import {config} from "./config";
import GameScene_Level_4 from "./GameScene_Level_4";


var playGame = false;
var blockList = [];

let blockListTmp = [];
let code;

// const startBlocks = {
//     blocks: {
//         languageVersion: 0,
//         blocks: [
//             {
//                 type: "move_player",
//                 x: 38,
//                 y: 62,
//                 fields: {
//                     VALUE: "RIGHT",
//                 },
//                 next: {
//                     block: {
//                         type: "move_player",
//                         fields: {
//                             VALUE: "DOWN",
//                         },
//                     },
//                 },
//             },
//         ],
//     },
// };
// const startBlocks = {
//     blocks: {
//
//         languageVersion: 0,
//         blocks: [
//             {
//                 "type": "move_player",
//                 "id": "m45=aU)/(p)y%*Tk*R|x",
//                 "x": 12,
//                 "y": 37,
//                 "fields": {
//                     "VALUE": "RIGHT"
//                 },
//                 "next": {
//                     "block": {
//                         "type": "controls_if",
//                         "id": "H!K.)VZClI@YyP`91Af4",
//                         "inputs": {
//                             "IF0": {
//                                 "block": {
//                                     "type": "direction_blocked",
//                                     "id": ")n%5Q0?3J_frwLT+}}*D",
//                                     "fields": {
//                                         "NAME": "RIGHT_BLOCKED"
//                                     }
//                                 }
//                             },
//                             "DO0": {
//                                 "block": {
//                                     "type": "move_player",
//                                     "id": "Edl]gA%TqM{1SHzEY#kN",
//                                     "fields": {
//                                         "VALUE": "DOWN"
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         ]
//     }
//
// };


const startBlocks = JSON.parse(localStorage.getItem("userBlocks"));
console.log(startBlocks);
(function () {

    let currentButton;

    function handlePlay(event) {
        // Add code for playing sound.
        console.log(Blockly.serialization.workspaces.save(workspace));

        const savedBlocks = Blockly.serialization.workspaces.save(workspace);
        localStorage.setItem("userBlocks", JSON.stringify(savedBlocks));

        // Retrieve the object from the storage
        // const data = localStorage.getItem("userData");
        // console.log("data: ", JSON.parse(data));


        blockList = [];
        Blockly.JavaScript.init(Blockly.common.getMainWorkspace());
        loadWorkspace(event.target);
        code = Blockly.JavaScript.workspaceToCode(Blockly.common.getMainWorkspace());
        // console.log("code");
        // console.log(code);
        playGame = true;
        blockListTmp = Blockly.common.getMainWorkspace().getAllBlocks(true);
        // console.log("blockListTmp");
        // console.log(blockListTmp);

        blockListTmp.forEach(function (block) {
            blockList.push(Blockly.JavaScript.blockToCode(block, true));
        });
        GameScene_Level_4.runBlocks(blockList);

        // console.log("blockList");
        // console.log(blockList);
    }

    // function save(button) {
    //     // Add code for saving the behavior of a button.
    //     button.blocklySave = Blockly.serialization.workspaces.save(Blockly.common.getMainWorkspace());
    // }

    // function handleSave() {
    //     document.body.setAttribute('mode', 'edit');
    //     save(currentButton);
    // }

    // function enableEditMode() {
    //     document.body.setAttribute('mode', 'edit');
    //     document.querySelectorAll('.button').forEach(btn => {
    //         btn.removeEventListener('click', handlePlay);
    //         btn.addEventListener('click', enableBlocklyMode);
    //     });
    // }

    function enableMakerMode() {
        document.body.setAttribute('mode', 'maker');
        document.querySelectorAll('.button').forEach(btn => {
            btn.addEventListener('click', handlePlay);
            btn.removeEventListener('click', enableBlocklyMode);
        });
    }

    function enableBlocklyMode(e) {
        document.body.setAttribute('mode', 'blockly');
        currentButton = e.target;
        loadWorkspace(currentButton);
    }

    function loadWorkspace(button) {
        const workspace = Blockly.common.getMainWorkspace();
        if (button.blocklySave) {
            Blockly.serialization.workspaces.load(button.blocklySave, workspace);
        }
    }

    // document.querySelector('#edit').addEventListener('click', enableEditMode);
    // document.querySelector('#done').addEventListener('click', enableMakerMode);
    // document.querySelector('#save').addEventListener('click', handleSave);

    enableMakerMode();


    const options = {
        toolbox: toolboxJson,
        collapse: true,
        comments: true,
        disable: true,
        maxBlocks: Infinity,
        trashcan: true,
        horizontalLayout: false,
        toolboxPosition: 'start',
        css: true,
        media: 'https://blockly-demo.appspot.com/static/media/',
        rtl: false,
        scrollbars: true,
        sounds: true,
        oneBasedIndex: true,
        grid: {
            spacing: 25,
            length: 3,
            colour: "#ccc",
            snap: true,
        },
    };
    const workspace = Blockly.inject('blocklyDiv', options);
    Blockly.serialization.workspaces.load(startBlocks, workspace);


})();

const game = new Phaser.Game(config);

export {code, playGame, blockList}
