Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "move_player",
        "message0": "Move %1 %2",
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
            },
            {
                "type": "input_value",
                "name": "Move"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 355,
        "tooltip": "",
        "helpUrl": ""
    },
]);


Blockly.JavaScript['move_player'] = function (block, el) {
    let blockValue = block.getFieldValue('VALUE');
    let code;


        code = 'if("' + blockValue + '" !== this.direction) { if("'+ blockValue +'" === "TO_OBJECT" && !this.objectSighted){this.direction = "";} else {this.direction = "' + blockValue + '"; }};\n if (this.direction === \'STOP\') {console.log("Stop")};';


    return code;
};


