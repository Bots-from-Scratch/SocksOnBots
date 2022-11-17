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


Blockly.JavaScript['move_player'] = function(block, el) {
    let value = block.getFieldValue('VALUE');


    if (value == 'LEFT') {

        let code = "console.log('left'); player.setVelocityX(-160); player.anims.play('left', true);";
        return code;
    } else if (value == 'RIGHT') {
        return right = true;
    } else if (value == 'UP') {
        return up = true;
    } else {
        return down = true;
    }
};



// Blockly.JavaScript['move_player'] = function(block) {
//     let value = '\'' + block.getFieldValue('VALUE') + '\'';
//     return value;
// };
