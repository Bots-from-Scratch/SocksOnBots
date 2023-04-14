import Phaser from 'phaser';
import css from "./style.css";
import './blockly/blocks/move_player';
import './blockly/blocks/walked_around';
import './blockly/blocks/direction_blocked';
import './blockly/blocks/direction_clear';
import './blockly/blocks/object_sock';
import './blockly/blocks/scan_for_object';
import './blockly/blocks/bool_sighted';
import {JavaScript} from "blockly";
import GameScene_Level_1 from "./GameScene_Level_1";
import {config} from "./config";
import GameScene_Level_4 from "./GameScene_Level_4";


var playGame = false;
var blockList = [];

let blockListTmp = [];
let code;


(function () {

    let currentButton;

    function handlePlay(event) {
        // Add code for playing sound.
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

    const toolbox = {
        'kind': 'flyoutToolbox',
        'contents': [
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
            {
                'kind': 'block',
                'type': 'object_sock'
            },
            {
                'kind': 'block',
                'type': 'scan_for_object'
            },
            {
                'kind': 'block',
                'type': 'bool_sighted'
            },
        ],
    };

    Blockly.inject('blocklyDiv', {
        toolbox: toolbox,
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
        oneBasedIndex: true
    });

})();

const game = new Phaser.Game(config);

export {code, playGame, blockList}
