Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "bool_sighted",
        "message0": "Object sighted",
        "output": "Boolean",
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    }
])

Blockly.JavaScript['bool_sighted'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'this.objectSighted';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};
