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
                ],
            },
        ],
        'previousStatement': null,
        'nextStatement': null,
        'colour': 355,
    },
]);


Blockly.JavaScript['move_player'] = function (block, el) {
    let value = block.getFieldValue('VALUE');
    let code;


    code = 'playBlocks.next();\nsetTimeout(() => {playBlocks.next("' + value + '");}, 600);\n';

    return code;
};
// Blockly.JavaScript['move_player'] = function (block, el) {
//     let value = block.getFieldValue('VALUE');
//     let code;
//
//     if (value == 'LEFT') {
//         code = 'playBlocks.next("' + value + '");\n';
//     } else if (value == 'RIGHT') {
//         code = 'playBlocks.next("' + value + '");\n';
//     } else if (value == 'UP') {
//         code = 'playBlocks.next("' + value + '");\n';
//     } else {
//         code = 'playBlocks.next("' + value + '");\n';
//     }
//     return code;
// };


// Blockly.JavaScript['move_player'] = function(block) {
//     let value = '\'' + block.getFieldValue('VALUE') + '\'';
//     return value;
// };
