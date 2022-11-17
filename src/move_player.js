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

    if (value == 'LEFT') {
        code = "console.log('left'); console.log(player); player.x -= 1;";
    } else if (value == 'RIGHT') {
        code = "setTimeout (function() {player.x += 1;}, 300)";
    } else if (value == 'UP') {
        code = "player.y -= 1;";
    } else {
        code = "player.y += 1;";
    }
    return code;
};


// Blockly.JavaScript['move_player'] = function(block) {
//     let value = '\'' + block.getFieldValue('VALUE') + '\'';
//     return value;
// };
