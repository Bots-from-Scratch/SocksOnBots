Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "check_for_collision",
        "message0": "Collision",
        "output": "Boolean",
        "colour": 230,
        "tooltip": "If player collides, this returns true",
        "helpUrl": ""
    }
]);


Blockly.JavaScript['check_for_collision'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'collided';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};
