// (function() {
//
//     let currentButton;
//     let code;
//
//     function handlePlay(event) {
//         // Add code for playing sound.
//         loadWorkspace(event.target);
//         code = Blockly.JavaScript.workspaceToCode(Blockly.common.getMainWorkspace());
//         console.log(code);
//
//     }
//
//
//     function save(button) {
//         // Add code for saving the behavior of a button.
//         button.blocklySave = Blockly.serialization.workspaces.save(Blockly.common.getMainWorkspace());
//     }
//
//     function handleSave() {
//         document.body.setAttribute('mode', 'edit');
//         save(currentButton);
//     }
//
//     function enableEditMode() {
//         document.body.setAttribute('mode', 'edit');
//         document.querySelectorAll('.button').forEach(btn => {
//             btn.removeEventListener('click', handlePlay);
//             btn.addEventListener('click', enableBlocklyMode);
//         });
//     }
//
//     function enableMakerMode() {
//         document.body.setAttribute('mode', 'maker');
//         document.querySelectorAll('.button').forEach(btn => {
//             btn.addEventListener('click', handlePlay);
//             btn.removeEventListener('click', enableBlocklyMode);
//         });
//     }
//
//     function enableBlocklyMode(e) {
//         document.body.setAttribute('mode', 'blockly');
//         currentButton = e.target;
//         loadWorkspace(currentButton);
//     }
//
//     function loadWorkspace(button) {
//         const workspace = Blockly.common.getMainWorkspace();
//         if (button.blocklySave) {
//             Blockly.serialization.workspaces.load(button.blocklySave, workspace);
//         }
//     }
//
//     document.querySelector('#edit').addEventListener('click', enableEditMode);
//     document.querySelector('#done').addEventListener('click', enableMakerMode);
//     document.querySelector('#save').addEventListener('click', handleSave);
//
//     enableMakerMode();
//
//     const toolbox = {
//         'kind': 'flyoutToolbox',
//         'contents': [
//             {
//                 'kind': 'block',
//                 'type': 'controls_repeat_ext',
//                 'inputs': {
//                     'TIMES': {
//                         'shadow': {
//                             'type': 'math_number',
//                             'fields': {
//                                 'NUM': 5,
//                             },
//                         },
//                     },
//                 },
//             },
//             {
//                 'kind': 'block',
//                 'type': 'move_player'
//             },
//         ],
//     };
//
//     Blockly.inject('blocklyDiv', {
//         toolbox: toolbox,
//         scrollbars: false,
//     });
//
// })();
//
