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

Blockly.JavaScript['direction_blocked'] = function (block) {
    let blockValue = block.getFieldValue('NAME');
    let code = "!direction." + blockValue + ".isClear";

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
