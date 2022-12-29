import Phaser from 'phaser';
import css from "./style.css";
import './move_player';
import './walked_around';
import './direction_blocked';
import './direction_clear';
import sky from './assets/sky.png';
import platform from './assets/platform.png';
import dude from './assets/dude.png';
import star from './assets/star.png';
import bomb from './assets/bomb.png';
import {JavaScript} from "blockly";

var rotation;
const ROATION_RIGHT = 0;
const ROATION_LEFT = 180;
const ROATION_UP = -90;
const ROATION_DOWN = 90;
var walkedBy = false;
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
var gfxDir;
let gameTick = 0;
let blockListTmp;
let code;
let collided = false;
var graphic;
var rightIsClear = true;
var leftIsClear = true;
var upIsClear = true;
var downIsClear = true;
var objectCollidedWith
var json = {
    "blocks": {
        "languageVersion": 0,
        "blocks": [
            {
                "type": "controls_if",
                "id": "e3H5^8+HCBJ01_e1Y1Zg",
                "x": 24,
                "y": 113,
                "extraState": {
                    "elseIfCount": 1
                },
                "inputs": {
                    "IF0": {
                        "block": {
                            "type": "direction_clear",
                            "id": "P4RJHTCTGtoLT}5556^c",
                            "fields": {
                                "NAME": "RIGHT_CLEAR"
                            }
                        }
                    },
                    "DO0": {
                        "block": {
                            "type": "move_player",
                            "id": "iHHZ{bU1f9Tc-;I8JGRB",
                            "fields": {
                                "VALUE": "RIGHT"
                            }
                        }
                    },
                    "IF1": {
                        "block": {
                            "type": "direction_blocked",
                            "id": "]]f;q$$:gA:vFWTr(pIH",
                            "fields": {
                                "NAME": "RIGHT_BLOCKED"
                            }
                        }
                    },
                    "DO1": {
                        "block": {
                            "type": "move_player",
                            "id": "GNq:N,Y2H))*GE1P9ex1",
                            "fields": {
                                "VALUE": "DOWN"
                            }
                        }
                    }
                }
            }
        ]
    }
};

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

        // blockListTmp.forEach(function (block) {
        //     blockList.push(Blockly.JavaScript.blockToCode(block));
        //
        // });
        console.log("blockList");
        console.log(blockList);
        console.log(player);

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
                'type': 'walked_around'
            },
            {
                'kind': 'block',
                'type': 'direction_blocked'
            },
            {
                'kind': 'block',
                'type': 'direction_clear'
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
        this.load.image('sky', sky);
        this.load.image('ground', platform);
        this.load.image('star', star);
        this.load.image('bomb', bomb);
        this.load.spritesheet('dude', dude, {frameWidth: 32, frameHeight: 48});
    }

    create() {
        this.add.image(400, 300, 'sky');


        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(300, 100, 'ground').setScale(0.3, 5).refreshBody();


        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        // platforms.setSize(400, 50, true);

        platforms.setTint(0x000bbb);
        blueStar = this.physics.add.sprite(500, 100, 'star');
        blueStar.setTint(0x006db2);

        player = this.physics.add.sprite(100, 100, 'dude');
        // player.body.bounce.set(1);
        player.body.setMaxSpeed(160);

        player.setCollideWorldBounds(true);
        player.body.onWorldBounds = true;

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{key: 'dude', frame: 4}],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
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

        scoreText = this.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#fff'});
        statusText = this.add.text(16, 50, 'Speed: ' + player.velocity + 'Angle: ' + player.body.rotation, {
            fontSize: '16px',
            fill: '#fff'
        });
        gfx = this.add.graphics();
        bombs = this.physics.add.group();

        this.physics.add.collider(bombs, platforms);
        this.physics.add.collider(player, bombs, hitBomb, null, this);

        this.physics.add.collider(player, platforms, function (player, platform) {
            objectCollidedWith = platform;
            collided = true;
            walkedBy = false;
            if (!player.body.blocked.none) {

                if (player.body.blocked.up) {
                    // player.setY(player.y + 2);
                    upIsClear = false;
                } else if (player.body.blocked.down) {
                    // player.setY(player.y - 2);
                    downIsClear = false;
                } else if (player.body.blocked.right) {
                    // player.setX(player.x - 2);
                    rightIsClear = false;
                } else {
                    // player.setX(player.x + 2);
                    leftIsClear = false;
                }
                player.setVelocityX(0);
                player.setVelocityY(0);
            }
        });
        // this.physics.add.collider(stars, platforms);

        this.physics.add.overlap(player, blueStar, collectStar, null, this);


        this.physics.world.on('worldbounds', (body) => {
            collided = true;
        });
        graphic = this.add.graphics({lineStyle: {color: 0x00ffff}});



    }

    resources = 0;
    timer = 0;

    update(time, delta) {
// console.log(player.body.onWall());
        if (player.active) {
            if (objectCollidedWith) {

                var closest = this.physics.closest(player, platforms.getChildren());
                // console.log(closest);
                var distCheb = Phaser.Math.RoundTo(Phaser.Math.Distance.Chebyshev(player.x, player.y, objectCollidedWith.x, objectCollidedWith.y), 0);
                var distClosest = Phaser.Math.RoundTo(Phaser.Math.Distance.BetweenPoints(player, objectCollidedWith), 0);
                var hypot = Math.hypot(player.body.halfHeight + objectCollidedWith.body.halfHeight, player.body.halfWidth + objectCollidedWith.body.halfWidth);


                // console.log(distClosest);
                // if (distClosest < Phaser.Math.Distance.Between(closest.x, closest.y, (closest.body.position.x + 1), (closest.body.position.y + 1))) {
                if (distClosest > hypot) {
                    console.log("clear")
                    leftIsClear = true;
                    rightIsClear = true;
                    downIsClear = true;
                    upIsClear = true;
                    if (player.body.x - player.body.prev.x !== 0 && (rotation === 0 || rotation === 180)) {
                        walkedBy = true;
                    } else if (player.body.y - player.body.prev.y !== 0 && (rotation === 90 || rotation === -90)) {
                        walkedBy = true;
                    }
                    ;
                    // this.physics.accelerateToObject(player, blueStar, 4000);
                }

                graphic
                    .clear()
                    .strokeCircle(player.x, player.y, distClosest).strokeRect(player.x - distCheb, player.y - distCheb, 2 * distCheb, 2 * distCheb);
                ;


                // if (closest.body && collided) {
                //     console.log(distCheb);
                //     if ((distCheb + closest.body.halfHeight) < distClosest) {
                //         console.log("distChev < halfHeight")
                //         this.physics.pause();
                //         player.angle = 0;
                //     }
                // }
                gfx.clear()
                    .lineStyle(2, 0xff3300)
                    .lineBetween(objectCollidedWith.x, objectCollidedWith.y, player.x, player.y);
                gfxDir = this.add.graphics().setDefaultStyles({lineStyle: {width: 10, color: 0xffdd00, alpha: 0.5}});
                var dist = Phaser.Math.Distance.BetweenPoints(player, blueStar);
                if (dist < 100) {
                    console.log("platform detected");
                    this.physics.accelerateToObject(player, blueStar, 4000);
                }
                // this.physics.velocityFromRotation(player.rotation, player.body.maxSpeed, player.body.acceleration);

// player.setCircle(50);
//         console.log(player.angle + ":" + Phaser.Math.RadToDeg(player.rotation));
                // player.angle += 0.5
                // if (collided) {
                //     console.log("collided");
                //     console.log(player.body.blocked);
                //
                // }
            }
            statusText.setText('  right clear: ' + rightIsClear + '\n distClosest: ' + distClosest + ' hypot: ' + hypot + ' body.angle: ' + player.body.angle + '\nwalkedBy: ' + walkedBy + '\nx: ' + player.body.prev.x);

            // if (player.body.touching.none) {
            //     value = '';
            //     collided = false;
            //
            //     player.setVelocityX(0);
            //     player.setVelocityY(0);
            // }
            if (playGame) {
                eval(code);
                this.physics.velocityFromAngle(rotation, player.body.maxSpeed, player.body.acceleration);
                try {

                    // eval(code);

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
                // this.physics.velocityFromAngle(player.body.rotation, player.body.maxSpeed, player.body.acceleration);
                // console.log(player);
                // player.setVelocityX(0);
                // player.setVelocityY(0);
                this.physics.pause();
objectCollidedWith = null;
                this.scene.restart();

            }

            if (cursors.left.isDown || value === 'LEFT') {
                rotation = ROATION_LEFT;
                // player.setVelocityX(-160);
                player.setVelocityY(0);
                player.anims.play('left', true);
            } else if (cursors.right.isDown || value === 'RIGHT') {
                rotation = ROATION_RIGHT;
                // player.setVelocityX(160);
                player.setVelocityY(0);
                player.anims.play('right', true);
            } else {
                // player.setVelocityX(0);

                player.anims.play('turn');
            }

            if (cursors.up.isDown || value === 'UP') {
                rotation = ROATION_UP;
                player.setVelocityX(0);
                // player.setVelocityY(-160);
            } else if (cursors.down.isDown || value === 'DOWN') {
                rotation = ROATION_DOWN;
                player.setVelocityX(0);
                // player.setVelocityY(160);
            } else {
                // player.setVelocityY(0);
            }
            // playGame = false;
            if (value == 'STOP') {
                // player.setVelocityX(0);
                // player.setVelocityY(0);
            }
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
