Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "move_player",
        "message0": "Move %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "VALUE",
                "options": [
                    [
                        "left",
                        "LEFT"
                    ],
                    [
                        "right",
                        "RIGHT"
                    ],
                    [
                        "up",
                        "UP"
                    ],
                    [
                        "down",
                        "DOWN"
                    ],
                    [
                        "to object",
                        "TO_OBJECT"
                    ]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 355,
        "tooltip": "",
        "helpUrl": ""
    }
]);


Blockly.JavaScript['move_player'] = function (block, el) {
    let blockValue = block.getFieldValue('VALUE');
    let code;


    code = 'move_player(); \n ';


    return code;
};

function initInterpreterGoRight(interpreter, scope) {
    // Ensure function name does not conflict with variable names.

    // uses to time outs, terminates the upward motion before termination moving right
    Blockly.JavaScript.addReservedWords('move_player');
    var wrapper = interpreter.createAsyncFunction(
        function (callback) {
            this.direction = 'RIGHT';
            setTimeout(function () {
                this.direction = "UP";
                callback();
            }, 300);
        });
    interpreter.setProperty(scope, 'move_player', wrapper);
}

