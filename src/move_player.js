Blockly.common.defineBlocksWithJsonArray([
    {
        'type': 'move_player',
        'message0': 'Move %1',
        'args0': [
            {
                'type': 'field_dropdown',
                'name': 'VALUE',
                'options': [
                    ['left', 'LEFT'],
                    ['right', 'RIGHT'],
                    ['up', 'UP'],
                    ['down', 'DOWN'],
                    ['stop', 'STOP'],
                    ['to star', 'TOSTAR']
                ],
            },
        ],
        'previousStatement': null,
        'nextStatement': null,
        'colour': 355,
    },
]);


// Blockly.JavaScript['move_player'] = function (block, el) {
//     let blockValue = block.getFieldValue('VALUE');
//     let code;
//
//
//     code = 'setTimeout(() => {playBlocks.next("' + blockValue + '");}, 600)\n';
//
//     return code;
// };


// Blockly.JavaScript['move_player'] = function (block, el) {
//     let blockValue = block.getFieldValue('VALUE');
//     let code;
//
//     code = 'if("' + blockValue + '" != value) { playBlocks.next("' + blockValue + '"); }\n';
//
//     return code;
// };


Blockly.JavaScript['move_player'] = function (block, el) {
    let blockValue = block.getFieldValue('VALUE');
    let code;

    if (blockValue == 'TOSTAR') {

        code = ' this.physics.accelerateToObject(player,blueStar, 4000 ); '
    }
    else {
        code = 'if("' + blockValue + '" != value) { value = "' + blockValue + '"; }\nif(value == \'STOP\') {console.log("Stop")};';
    }

    return code;
};


// Blockly.JavaScript['move_player'] = function(block) {
//     let value = '\'' + block.getFieldValue('VALUE') + '\'';
//     return value;
// };
