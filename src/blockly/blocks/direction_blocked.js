import GameScene_Level_4 from "../../GameScene_Level_4";

Blockly.common.defineBlocksWithJsonArray([{
    "type": "direction_blocked",
    "message0": "%1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "NAME",
            "options": [
                [
                    "right is blocked",
                    "right"
                ],
                [
                    "left is blocked",
                    "left"
                ],
                [
                    "up is blocked",
                    "up"
                ],
                [
                    "down is blocked",
                    "down"
                ]
            ]
        }
    ],
    "output": "Boolean",
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
}])

// Blockly.JavaScript['direction_blocked'] = function (block) {
//     const gameScene = new GameScene_Level_4();
//
// // Rufe den Getter auf, um den Wert von rightIsClear zu erhalten
//     const isRightClear = gameScene.rightIsClear;
//
//     var dropdown_name = block.getFieldValue('NAME');
//     var code = '';
//     // TODO: Assemble JavaScript into code variable.
//     if (dropdown_name === 'right' && isRightClear) {
//         console.log("isRightClear");
//
//         code += 'true'
//     } else if (dropdown_name == 'LEFT_BLOCKED') {
//         code += '!this.leftIsClear'
//     } else if (dropdown_name == 'UP_BLOCKED') {
//         code += '!this.upIsClear'
//     } else {
//         code += '!this.downIsClear'
//     }
//     // Erstelle eine Instanz der Klasse
//
// // Nutze den Wert weiter
//
//     console.log(code);
//     // TODO: Change ORDER_NONE to the correct strength.
//     return code;
// };

Blockly.JavaScript['direction_blocked'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');
    var code = '';
    if (dropdown_name === 'right') {
        code += 'this.dir.right.isClear';
    } else if (dropdown_name === 'left') {
        code += '!this.leftIsClear';
    } else if (dropdown_name === 'up') {
        code += '!this.upIsClear';
    } else {
        code += '!this.downIsClear';
    }
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
