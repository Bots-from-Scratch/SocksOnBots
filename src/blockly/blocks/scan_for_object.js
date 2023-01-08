Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "scan_for_object",
        "message0": "look for %1",
        "args0": [

            {
                "type": "input_value",
                "name": "look for",
                "check": "String",
                "align": "RIGHT"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 355,
        "tooltip": "",
        "helpUrl": ""
    }
]);

Blockly.JavaScript['scan_for_object'] = function (block) {
    // console.log(block);
    var value_look_for = Blockly.JavaScript.valueToCode(block, 'look for', Blockly.JavaScript.ORDER_ATOMIC);
    var code =
        'this.objectToScanFor = ' + value_look_for + ';\n    ' +
        'if (this.scannedObject) {\n' +
        '   if (this.checkIfObjectBlocksViewline(this.blockingObjects)) {\n' +
        '       console.log(\'not in view\');\n' +
        '       this.scanLineGfx.setVisible(false);\n' +
        '        this.objectSighted = false;\n' +
        '   } else {\n' +
        '       this.scanLineGfx.setVisible(true);\n' +
        '        this.objectSighted = true;\n' +
        '   }\n' +
        '} else {' +
        '  this.objectSighted = false;\n' +
        '};\n';
    return code;
};
