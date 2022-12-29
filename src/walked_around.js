Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "walked_around",
        "message0": "Walked Around",
        "output": "Boolean",
        "colour": 230,
        "tooltip": "If player walked around obstacle, this returns true",
        "helpUrl": ""
    }
]);


Blockly.JavaScript['walked_around'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'this.walkedBy';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};
