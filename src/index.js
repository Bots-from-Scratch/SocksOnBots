import Phaser from 'phaser';
import css from "./style.css";
import './move_player';
import './check_for_collision';
import sky from './assets/sky.png';
import platform from './assets/platform.png';
import dude from './assets/dude.png';
import star from './assets/star.png';
import bomb from './assets/bomb.png';
import { JavaScript } from "blockly";
import * as worldLoader from './maps/world_loader';

var player;
var stars;
var blueStar;
var platforms;
var cursors;
var score = 0;
var scoreText;
var statusText;
var bombs;
var value;
var codeFromBlock;
var playGame = false;
var blockList = [];
var gfx;
let gameTick = 0;
let blockListTmp;
let code;
let collided = false;

(function () {

    let currentButton;

    function handlePlay(event) {
        // Add code for playing sound.
        blockList = [];
        Blockly.JavaScript.init(Blockly.common.getMainWorkspace());
        loadWorkspace(event.target);
        code = Blockly.JavaScript.workspaceToCode(Blockly.common.getMainWorkspace());
        console.log("code");
        console.log(code);
        playGame = true;
        blockListTmp = Blockly.common.getMainWorkspace().getAllBlocks(true);
        console.log("blockListTmp");
        console.log(blockListTmp);
        // eval(code);

        // blockListTmp.forEach(function (block) {
        //     blockList.push(Blockly.JavaScript.blockToCode(block));
        //
        // });
        console.log("blockList");
        console.log(blockList);

    }

    function save(button) {
        // Add code for saving the behavior of a button.
        button.blocklySave = Blockly.serialization.workspaces.save(Blockly.common.getMainWorkspace());
    }

    function handleSave() {
        document.body.setAttribute('mode', 'edit');
        save(currentButton);
    }

    function enableEditMode() {
        document.body.setAttribute('mode', 'edit');
        document.querySelectorAll('.button').forEach(btn => {
            btn.removeEventListener('click', handlePlay);
            btn.addEventListener('click', enableBlocklyMode);
        });
    }

    function enableMakerMode() {
        document.body.setAttribute('mode', 'maker');
        document.querySelectorAll('.button').forEach(btn => {
            btn.addEventListener('click', handlePlay);
            btn.removeEventListener('click', enableBlocklyMode);
        });
    }

    function enableBlocklyMode(e) {
        document.body.setAttribute('mode', 'blockly');
        currentButton = e.target;
        loadWorkspace(currentButton);
    }

    function loadWorkspace(button) {
        const workspace = Blockly.common.getMainWorkspace();
        if (button.blocklySave) {
            Blockly.serialization.workspaces.load(button.blocklySave, workspace);
        }
    }

    document.querySelector('#edit').addEventListener('click', enableEditMode);
    document.querySelector('#done').addEventListener('click', enableMakerMode);
    document.querySelector('#save').addEventListener('click', handleSave);

    enableMakerMode();

    const toolbox = {
        'kind': 'flyoutToolbox',
        'contents': [
            {
                'kind': 'block',
                'type': 'controls_repeat_ext',
                'inputs': {
                    'TIMES': {
                        'shadow': {
                            'type': 'math_number',
                            'fields': {
                                'NUM': 5,
                            },
                        },
                    },
                },
            },
            {
                'kind': 'block',
                'type': 'controls_whileUntil',
            },
            {
                'kind': 'block',
                'type': 'controls_if',
            },
            {
                'kind': 'block',
                'type': 'logic_boolean',
            },
            {
                'kind': 'block',
                'type': 'move_player'
            },
            {
                'kind': 'block',
                'type': 'check_for_collision'
            },
        ],
    };

    Blockly.inject('blocklyDiv', {
        toolbox: toolbox,
        scrollbars: false,
    });

})();


class MyGame extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        worldLoader.preload(this);
    }

    create() {

        worldLoader.createBackground(this);

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(300, 100, 'ground').setScale(0.3, 1.2).refreshBody().setSize(150, 42, true);


        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        // platforms.setSize(400, 50, true);

        platforms.setTint(0x000bbb);
        blueStar = this.physics.add.sprite(500, 100, 'star');
        blueStar.setTint(0x006db2);

        player = this.physics.add.sprite(100, 100, 'dude');
        player.body.bounce.set(1);
        player.body.setMaxSpeed(5000);

        player.setCollideWorldBounds(true);
        player.body.onWorldBounds = true;

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        cursors = this.input.keyboard.createCursorKeys();

        // stars = this.physics.add.group({
        //     key: 'star',
        //     frameQuantity: 1,
        //     // setXY: { x: Phaser.Math.Between(10, 450), y: Phaser.Math.Between(10, 790), stepX: Phaser.Math.Between(10, 90) }
        //     setXY: {x:500, y:100}
        // });
        // var rect = new Phaser.Geom.Rectangle(0, 0, 800, 600);
        //
        // Phaser.Actions.RandomRectangle(stars.getChildren(), rect);
        //
        // stars.children.iterate(function (child) {
        //
        //     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        // });

        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
        statusText = this.add.text(16, 50, 'Speed: ' + player.velocity + 'Angle: ' + player.angle, {
            fontSize: '32px',
            fill: '#fff'
        });
        gfx = this.add.graphics();
        bombs = this.physics.add.group();

        this.physics.add.collider(bombs, platforms);
        this.physics.add.collider(player, bombs, hitBomb, null, this);

        this.physics.add.collider(player, platforms, function () {
            collided = true;
            // if (!player.body.blocked.none) {
            //
            //     if (player.body.blocked.up) {
            //         player.setY(player.y + 2);
            //     } else if (player.body.blocked.down) {
            //         player.setY(player.y - 2);
            //     } else if (player.body.blocked.right) {
            //         player.setX(player.x - 2);
            //     } else {
            //         player.setX(player.x + 2);
            //     }
            //     player.setVelocityX(0);
            //     player.setVelocityY(0);
            // }
        });
        // this.physics.add.collider(stars, platforms);

        this.physics.add.overlap(player, blueStar, collectStar, null, this);
        this.physics.add.overlap(player, platforms, function () {
            collided = true;
            console.log("collision with platform");
            // player.setCircle(20);
        });

        this.physics.world.on('worldbounds', (body) => {
            collided = true;
        });

    }

    resources = 0;
    timer = 0;

    update(time, delta) {

        var closest = this.physics.closest(player, platforms.getChildren());
        console.log(closest);
        gfx.clear()
            .lineStyle(2, 0xff3300)
            .lineBetween(closest.x, closest.y, player.x, player.y)
        var dist = Phaser.Math.Distance.BetweenPoints(player, blueStar);
        if (dist < 100) {
            console.log("platform detected");
            this.physics.accelerateToObject(player, blueStar, 4000);
        }
        // this.physics.velocityFromRotation(player.rotation, player.body.maxSpeed, player.body.acceleration);

        statusText.setText('  Closest: ' + this.physics.closest(player, platforms.getChildren()).displayWidth + ' dist: ' + dist);
        // player.setCircle(50);
        //         console.log(player.angle + ":" + Phaser.Math.RadToDeg(player.rotation));
        // player.angle += 0.5
        if (collided) {
            console.log("collided");
            console.log(player.body.blocked);

        }
        if (player.body.touching.none) {
            value = '';
            collided = false;

            player.setVelocityX(0);
            player.setVelocityY(0);
        }
        if (playGame) {

            try {
                eval(code);

                // value = '';
                // eval(listBlock.next().value);
                // let firstBlock = blockListTmp.shift();
                //
                // console.log("firstBlock");
                // console.log(firstBlock);
                // console.log("blockList");
                // console.log(blockList.length);
                // playBlocks.next(firstBlock);
            } catch (error) {
                console.log(error);
            }
        }
        if (cursors.space.isDown) {
            this.physics.velocityFromRotation(player.rotation, player.body.maxSpeed, player.body.acceleration);
        }
        if (cursors.left.isDown || value === 'LEFT') {
            player.angle = 180;

            player.anims.play('left', true);
        } else if (cursors.right.isDown || value === 'RIGHT') {
            player.angle = 0;


            player.anims.play('right', true);
        } else {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown || value === 'UP') {
            player.angle = -90;

        } else if (cursors.down.isDown || value === 'DOWN') {
            player.angle = 90;

        } else {
            player.setVelocityY(0);
        }
        playGame = false;
        if (value == 'STOP') {
            player.setVelocityX(0);
            player.setVelocityY(0);
        }
    }


}


function* gen() {
    while (true) {
        const blockCode = yield;

        // Blockly.JavaScript.init(Blockly.common.getMainWorkspace());
        console.log("blockCode");
        console.log(blockCode);
        // console.log(Blockly.JavaScript.blockToCode(value));
        value = blockCode;
        setTimeout(() => {
            value = '';
        }, 1200);
    }
}

// const list = ["player.setVelocityX(160);setTimeout (function() {player.setVelocityX(0);}, 600); "];
const playBlocks = gen();


function hitWorldBounds(player) {

    //  Play the flash animation.
    //
    //  Sometimes you'll notice it doesn't always start, i.e. if the sprite
    //  collides with the world bounds quickly before the previous 'flash'
    //  has completed. This is just because the animation needs to complete
    //  before playing again, the event did actually occur twice.

    player.setVelocityX(160);

}


function collectStar(player, star) {
    star.disableBody(true, true);

    score += 10;
    this.physics.pause();
    scoreText.setText('Level Completed');
    this.gameOver = true;

    // if (stars.countActive(true) === 0) {
    //     stars.children.iterate(function (child) {
    //         child.enableBody(true, child.x, 200, true, true);
    //     });
    //
    //     var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    // var bomb = bombs.create(x, 16, 'bomb');
    // bomb.setBounce(1);
    // bomb.setCollideWorldBounds(true);
    // bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    // }

}

// var playBlocks = function* () {
//     yield 1;
//     yield 2;
// };
// var playBlocks = function* (blockList, listBlock = 1) {
//     for (let index = 0; index < blockList.length; index += listBlock) {
//         yield blockList.slice(index, index + listBlock);
//     }
// };


function hitBomb(player) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    this.gameOver = true;
    if (this.gameOver) {
        scoreText.setText('Game Over');
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: { y: 300 },
            debug: true
        }
    },
    scene: MyGame
};

const game = new Phaser.Game(config);
