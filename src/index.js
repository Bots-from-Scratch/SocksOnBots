import Phaser from 'phaser';
import css from "./style.css";
import './move_player';
import './walked_around';
import './direction_blocked';
import './direction_clear';
import {JavaScript} from "blockly";
import GameScene from "./GameScene";
import {config} from "./config";



var playGame = false;
var blockList = [];

let blockListTmp;
let code;

var json = {
    "blocks": {
        "languageVersion": 0,
        "blocks": [
            {
                "type": "controls_if",
                "id": "e3H5^8+HCBJ01_e1Y1Zg",
                "x": 24,
                "y": 113,
                "extraState": {
                    "elseIfCount": 1
                },
                "inputs": {
                    "IF0": {
                        "block": {
                            "type": "direction_clear",
                            "id": "P4RJHTCTGtoLT}5556^c",
                            "fields": {
                                "NAME": "RIGHT_CLEAR"
                            }
                        }
                    },
                    "DO0": {
                        "block": {
                            "type": "move_player",
                            "id": "iHHZ{bU1f9Tc-;I8JGRB",
                            "fields": {
                                "VALUE": "RIGHT"
                            }
                        }
                    },
                    "IF1": {
                        "block": {
                            "type": "direction_blocked",
                            "id": "]]f;q$$:gA:vFWTr(pIH",
                            "fields": {
                                "NAME": "RIGHT_BLOCKED"
                            }
                        }
                    },
                    "DO1": {
                        "block": {
                            "type": "move_player",
                            "id": "GNq:N,Y2H))*GE1P9ex1",
                            "fields": {
                                "VALUE": "DOWN"
                            }
                        }
                    }
                }
            }
        ]
    }
};

(function () {

    let currentButton;

    function handlePlay(event) {
        // Add code for playing sound.
        blockList = [];
        Blockly.JavaScript.init(Blockly.common.getMainWorkspace());
        loadWorkspace(event.target);
        code = Blockly.JavaScript.workspaceToCode(Blockly.common.getMainWorkspace());
        console.log("code");
        console.log(code);
        playGame = true;
        blockListTmp = Blockly.common.getMainWorkspace().getAllBlocks(true);
        console.log("blockListTmp");
        console.log(blockListTmp);

        // blockListTmp.forEach(function (block) {
        //     blockList.push(Blockly.JavaScript.blockToCode(block));
        //
        // });
        console.log("blockList");
        console.log(blockList);
        console.log(GameScene.this.player);

    }

    function save(button) {
        // Add code for saving the behavior of a button.
        button.blocklySave = Blockly.serialization.workspaces.save(Blockly.common.getMainWorkspace());
    }

    function handleSave() {
        document.body.setAttribute('mode', 'edit');
        save(currentButton);
    }

    function enableEditMode() {
        document.body.setAttribute('mode', 'edit');
        document.querySelectorAll('.button').forEach(btn => {
            btn.removeEventListener('click', handlePlay);
            btn.addEventListener('click', enableBlocklyMode);
        });
    }

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

    document.querySelector('#edit').addEventListener('click', enableEditMode);
    document.querySelector('#done').addEventListener('click', enableMakerMode);
    document.querySelector('#save').addEventListener('click', handleSave);

    enableMakerMode();

    const toolbox = {
        'kind': 'flyoutToolbox',
        'contents': [
            {
                'kind': 'block',
                'type': 'controls_repeat_ext',
                'inputs': {
                    'TIMES': {
                        'shadow': {
                            'type': 'math_number',
                            'fields': {
                                'NUM': 5,
                            },
                        },
                    },
                },
            },
            {
                'kind': 'block',
                'type': 'controls_if',
            },
            {
                'kind': 'block',
                'type': 'logic_boolean',
            },
            {
                'kind': 'block',
                'type': 'move_player'
            },
            {
                'kind': 'block',
                'type': 'walked_around'
            },
            {
                'kind': 'block',
                'type': 'direction_blocked'
            },
            {
                'kind': 'block',
                'type': 'direction_clear'
            },
        ],
    };

    Blockly.inject('blocklyDiv', {
        toolbox: toolbox,
        scrollbars: false,
    });

})();

const game = new Phaser.Game(config);

export {code, playGame}
