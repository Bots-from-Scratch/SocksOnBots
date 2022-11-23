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
        code = "player.setVelocityX(-160);";
    } else if (value == 'RIGHT') {
        code = "player.setVelocityX(160);setTimeout (function() {player.setVelocityX(0);}, 600);";
    } else if (value == 'UP') {
        code = "player.setVelocityY(-160);setTimeout (function() {player.setVelocityY(0);}, 600);";
    } else {
        code = "player.setVelocityY(160);setTimeout (function() {player.setVelocityY(0);}, 600);";
    }
    return code;
};


// Blockly.JavaScript['move_player'] = function(block) {
//     let value = '\'' + block.getFieldValue('VALUE') + '\'';
//     return value;
// };
