import Phaser from 'phaser';
import '../acorn_interpreter';
import css from "./style.css";
import '../move_player';
import './blockly/blocks/walked_around';
import './blockly/blocks/direction_blocked';
import './blockly/blocks/direction_clear';
import './blockly/blocks/object_sock';
import './blockly/blocks/scan_for_object';
import './blockly/blocks/bool_sighted';
import {toolboxJson} from './blockly/toolbox_phaser';
import {JavaScript} from "blockly";
import GameScene_Level_1 from "./GameScene_Level_1";
import {config} from "./config";
import {javascriptGenerator} from "blockly/javascript";
import 'blockly/blockly_compressed';
import 'blockly/javascript_compressed';
import 'blockly/blocks_compressed';
import 'blockly/msg/en'


var playGame = false;
var blockList = [];
var direction = '';
let blockListTmp;
let code;
let myInterpreter = null;


(function () {

    let currentButton;
    // let myInterpreter = null;

    // function initApi(interpreter, scope) {
    //     // Add an API function for the alert() block, generated for "text_print" blocks.
    //     initInterpreterGoRight(interpreter, scope);
    //
    //     // Add an API function for highlighting blocks.
    //     var wrapper = function (id) {
    //         id = id ? id.toString() : '';
    //         return interpreter.createPrimitive(highlightBlock(id));
    //     };
    //     interpreter.setProperty(scope, 'highlightBlock',
    //         interpreter.createNativeFunction(wrapper));
    // }

    function handlePlay(event) {

        // code = javascriptGenerator.workspaceToCode(Blockly.common.getMainWorkspace());
        // console.log("code");
        // console.log(code)
        runCode();
        console.log(direction);
        // myInterpreter = new Interpreter(code, initApi);
        // console.log("myInterpreter");
        // console.log(myInterpreter)
        // myInterpreter.run();

        // Add code for playing sound.
        // blockList = [];
        // Blockly.JavaScript.init(Blockly.common.getMainWorkspace());
        // loadWorkspace(event.target);
        // code = Blockly.JavaScript.workspaceToCode(Blockly.common.getMainWorkspace());
        // console.log("code");
        // console.log(code);
        playGame = true;
        // blockListTmp = Blockly.common.getMainWorkspace().getAllBlocks(true);
        // console.log("blockListTmp");
        // console.log(blockListTmp);

        // blockListTmp.forEach(function (block) {
        //     blockList.push(Blockly.JavaScript.blockToCode(block));
        //
        // });
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






})();

const startBlocks = {
    "blocks": {
        "blocks": [
            {
                "type": "variables_set",
                "x": 20,
                "y": 20,
                "inline": true,
                "fields": {
                    "VAR": {"id": "n"}
                },
                "inputs": {
                    "VALUE": {
                        "block": {
                            "type": "math_number",
                            "fields": {"NUM": 1}
                        }
                    }
                },
                "next": {
                    "block": {
                        "type": "controls_repeat_ext",
                        "inline": true,
                        "inputs": {
                            "TIMES": {
                                "block": {
                                    "type": "math_number",
                                    "fields": {"NUM": 4}
                                }
                            },
                            "DO": {
                                "block": {
                                    "type": "variables_set",
                                    "inline": true,
                                    "fields": {
                                        "VAR": {"id": "n"}
                                    },
                                    "inputs": {
                                        "VALUE": {
                                            "block": {
                                                "type": "math_arithmetic",
                                                "fields": {"OP": "MULTIPLY"},
                                                "inputs": {
                                                    "A": {
                                                        "block": {
                                                            "type": "variables_get",
                                                            "fields": {
                                                                "VAR": {"id": "n"}
                                                            }
                                                        }
                                                    },
                                                    "B": {
                                                        "block": {
                                                            "type": "math_number",
                                                            "fields": {"NUM": 2}
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "next": {
                                        "block": {
                                            "type": "text_print",
                                            "inputs": {
                                                "TEXT": {
                                                    "block": {
                                                        "type": "variables_get",
                                                        "fields": {
                                                            "VAR": {"id": "n"}
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        ]
    },
    "variables": [
        {
            "name": "n",
            "id": "n"
        }
    ]
};


const demoWorkspace = Blockly.inject('blocklyDiv', {
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
    oneBasedIndex: true
});
Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
Blockly.JavaScript.addReservedWords('highlightBlock');
Blockly.serialization.workspaces.load(startBlocks, demoWorkspace)

const outputArea = document.getElementById('output');
var runner;
function initApi(interpreter, globalObject) {
    // Add an API function for the alert() block, generated for "text_print" blocks.
    const wrapperAlert = function alert(text) {
        text = arguments.length ? text : '';
        outputArea.value += '\n' + text;
    };
    interpreter.setProperty(globalObject, 'alert',
        interpreter.createNativeFunction(wrapperAlert));

    // Add an API function for the prompt() block.
    const wrapperPrompt = function prompt(text) {
        return window.prompt(text);
    };
    interpreter.setProperty(globalObject, 'prompt',
        interpreter.createNativeFunction(wrapperPrompt));

    initInterpreterGoRight(interpreter, globalObject);
    // Add an API function for highlighting blocks.
    const wrapperHighlight = function (id) {
        id = String(id || '');
        return highlightBlock(id);
    };
    interpreter.setProperty(globalObject, 'highlightBlock',
        interpreter.createNativeFunction(wrapperHighlight));

}

// Each step will run the interpreter until the highlightPause is true.
let highlightPause = false;
var latestCode = '';
function highlightBlock(id) {
    demoWorkspace.highlightBlock(id);
    highlightPause = true;
}

function resetStepUi(clearOutput) {
    demoWorkspace.highlightBlock(null);
    highlightPause = false;

    if (clearOutput) {
        outputArea.value = 'Program output:\n=================';
    }
    myInterpreter = null;
}

function generateCodeAndLoadIntoInterpreter() {
    // Generate JavaScript code and parse it.
    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    Blockly.JavaScript.addReservedWords('highlightBlock');
    latestCode = Blockly.JavaScript.workspaceToCode(demoWorkspace);

    resetStepUi(true);
}

function resetInterpreter() {
    myInterpreter = null;
    if (runner) {
        clearTimeout(runner);
        runner = null;
    }
}

function speak(){
    displayText.setText('Score: ' );
}

function runCode() {
    if (!myInterpreter) {
        // First statement of this code.
        // Clear the program output.
        resetStepUi(true);
        // runButton.disabled = 'disabled';

        // And then show generated code in an alert.
        // In a timeout to allow the outputArea.value to reset first.
        setTimeout(function () {


            // Begin execution
            highlightPause = false;
            myInterpreter = new Interpreter(latestCode, initApi);
            runner = function () {
                if (myInterpreter) {
                    var hasMore = myInterpreter.run();
                    if (hasMore) {
                        // Execution is currently blocked by some async call.
                        // Try again later.
                        setTimeout(runner, 10);
                    } else {
                        // Program is complete.
                        outputArea.value += '\n\n<< Program complete >>';
                        resetInterpreter();
                        resetStepUi(false);
                    }
                }
            };
            runner();
        }, 1);
        return;
    }
}

// Load the interpreter now, and upon future changes.
generateCodeAndLoadIntoInterpreter();
demoWorkspace.addChangeListener(function (event) {
    if (!(event instanceof Blockly.Events.Ui)) {
        // Something changed. Parser needs to be reloaded.
        resetInterpreter();
        generateCodeAndLoadIntoInterpreter();
    }
});

const game = new Phaser.Game(config);

export {code, direction, playGame, myInterpreter}
