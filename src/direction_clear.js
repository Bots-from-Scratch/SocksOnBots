Blockly.common.defineBlocksWithJsonArray([{
  "type": "direction_clear",
  "message0": "%1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "NAME",
      "options": [
        [
          "right is clear",
          "RIGHT_CLEAR"
        ],
        [
          "left is clear",
          "LEFT_CLEAR"
        ],
        [
          "up is clear",
          "UP_CLEAR"
        ],
        [
          "down is clear",
          "DOWN_CLEAR"
        ]
      ]
    }
  ],
  "output": "Boolean",
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}])

Blockly.JavaScript['direction_clear'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  var code = '';
  // TODO: Assemble JavaScript into code variable.
  if (dropdown_name == 'RIGHT_CLEAR') {
    code += 'this.rightIsClear'
  } else if (dropdown_name == 'LEFT_CLEAR') {
    code += 'this.leftIsClear'
  } else if (dropdown_name == 'UP_CLEAR') {
    code += 'this.upIsClear'
  } else {
    code += 'this.downIsClear'
  }

  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
