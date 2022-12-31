import {Scene} from 'phaser';
import sky from "./assets/sky.png";
import platform from "./assets/platform.png";
import star from "./assets/star.png";
import bomb from "./assets/bomb.png";
import dude from "./assets/dude.png";
import {code, playGame} from "./index";

class GameScene extends Scene {
    ROTATION_RIGHT = 0;
    ROTATION_LEFT = 180;
    ROTATION_UP = -90;
    ROTATION_DOWN = 90;
    constructor() {
        super('game');

    }

    init() {

        this.score = 0;

        this.walkedBy = false;

        this.value;
        var codeFromBlock;
        var blockList = [];


        let gameTick = 0;
        let blockListTmp;
        let code;
        this.collided = false;

        this.rightIsClear = true;
        this.leftIsClear = true;
        this.upIsClear = true;
        this.downIsClear = true;

        this.objectCollidedWith = {};
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

        this.createPlatforms();
        this.createPlayer();
        this.createCursor();
        this.createStar();

        this.scoreText = this.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#fff'});

        this.button = this.add.text(95, 400, 'Back to Menu');
        this.buttonUp = this.add.text(600, 400, 'Increase Score');
        this.button.setInteractive();
        this.buttonUp.setInteractive();
        this.button.on('pointerover', () => this.button.setTint(0x006db2));
        this.button.on('pointerdown', () => this.scene.start('preload'));

        this.buttonUp.on('pointerdown', () => {
            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);
            console.log(this.player);
        });


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


        this.statusText = this.add.text(16, 50, 'Speed: ' + this.player.velocity + 'Angle: ' + this.player.body.rotation, {
            fontSize: '16px',
            fill: '#fff'
        });
        this.gfx = this.add.graphics();
        this.bombs = this.physics.add.group();

        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs);


        // this.physics.add.collider(stars, platforms);


        this.physics.world.on('worldbounds', (body) => {
            this.collided = true;
        });
        this.graphic = this.add.graphics({lineStyle: {color: 0x00ffff}});

    }

    createPlatforms() {
        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(300, 100, 'ground').setScale(0.3, 5).refreshBody();


        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        // platforms.setSize(400, 50, true);

        this.platforms.setTint(0x000bbb);
    }

    createPlayer() {
        this.player = this.physics.add.sprite(100, 100, 'dude');
        // this.player.body.bounce.set(1);
        this.player.body.setMaxSpeed(160);
        this.physics.add.collider(this.player, this.platforms, function (_player, _platform) {
            console.log(_platform);
            this.objectCollidedWith = _platform;
            console.log(this.objectCollidedWith);
            this.collided = true;
            console.log(this.collided);
            this.walkedBy = false;
            console.log(this.walkedBy);
            if (!_player.body.blocked.none) {

                if (_player.body.blocked.up) {
                    // player.setY(player.y + 2);
                    this.upIsClear = false;
                } else if (_player.body.blocked.down) {
                    // player.setY(player.y - 2);
                    this.downIsClear = false;
                } else if (_player.body.blocked.right) {
                    // player.setX(player.x - 2);
                    this.rightIsClear = false;
                } else {
                    // player.setX(player.x + 2);
                    this.leftIsClear = false;
                }
                this.player.setVelocityX(0);
                this.player.setVelocityY(0);
            }
        },this.processCallback, this);

        this.player.setCollideWorldBounds(true);
        this.player.body.onWorldBounds = true;

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
    }

    createCursor() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    createStar() {
        this.blueStar = this.physics.add.sprite(500, 100, 'star');
        this.blueStar.setTint(0x006db2);

        this.physics.add.overlap(this.player, this.blueStar, this.collectStar, null, this);
    }

    processCallback (obj1, obj2) {

        //  This function can perform your own additional checks on the 2 objects that collided.
        //  For example you could test for velocity, health, etc.
        //  This function needs to return either true or false. If it returns true then collision carries on (separating the two objects).
        //  If it returns false the collision is assumed to have failed and aborts, no further checks or separation happen.

        if (obj1.body)
        {
            return true;
        }
        else
        {
            return false;
        }

    }

    collectStar(player, star) {
        star.disableBody(true, true);

        this.score += 10;
        this.physics.pause();
        this.scoreText.setText('Level Completed');
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

    update() {
        if (this.player.active) {
            if (this.objectCollidedWith.active) {

                var distCheb = Phaser.Math.RoundTo(Phaser.Math.Distance.Chebyshev(this.player.x, this.player.y, this.objectCollidedWith.x, this.objectCollidedWith.y), 0);
                var distClosest = Phaser.Math.RoundTo(Phaser.Math.Distance.BetweenPoints(this.player, this.objectCollidedWith), 0);
                var hypot = Math.hypot(this.player.body.halfHeight + this.objectCollidedWith.body.halfHeight, this.player.body.halfWidth + this.objectCollidedWith.body.halfWidth);


                // console.log(distClosest);
                // if (distClosest < Phaser.Math.Distance.Between(closest.x, closest.y, (closest.body.position.x + 1), (closest.body.position.y + 1))) {
                if (distClosest > hypot) {
                    console.log("clear")
                    this.leftIsClear = true;
                    this.rightIsClear = true;
                    this.downIsClear = true;
                    this.upIsClear = true;
                    if (this.player.body.x - this.player.body.prev.x !== 0 && (this.rotation === 0 || this.rotation === 180)) {
                        this.walkedBy = true;
                    } else if (this.player.body.y - this.player.body.prev.y !== 0 && (this.rotation === 90 || this.rotation === -90)) {
                        this.walkedBy = true;
                    }
                    ;
                    // this.physics.accelerateToObject(player, blueStar, 4000);
                }

                this.graphic
                    .clear()
                    .strokeCircle(this.player.x, this.player.y, distClosest).strokeRect(this.player.x - distCheb, this.player.y - distCheb, 2 * distCheb, 2 * distCheb);
                ;


                // if (closest.body && collided) {
                //     console.log(distCheb);
                //     if ((distCheb + closest.body.halfHeight) < distClosest) {
                //         console.log("distChev < halfHeight")
                //         this.physics.pause();
                //         player.angle = 0;
                //     }
                // }
                this.gfx.clear()
                    .lineStyle(2, 0xff3300)
                    .lineBetween(this.objectCollidedWith.x, this.objectCollidedWith.y, this.player.x, this.player.y);
                this.gfxDir = this.add.graphics().setDefaultStyles({
                    lineStyle: {
                        width: 10,
                        color: 0xffdd00,
                        alpha: 0.5
                    }
                });
                var dist = Phaser.Math.Distance.BetweenPoints(this.player, this.blueStar);
                if (dist < 100) {
                    console.log("platform detected");
                    this.physics.accelerateToObject(this.player, this.blueStar, 4000);
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
            this.statusText.setText('  right clear: ' + this.rightIsClear + '\n distClosest: ' + distClosest + ' hypot: ' + hypot + ' body.angle: ' + this.player.body.angle + '\nwalkedBy: ' + this.walkedBy + '\nx: ' + this.player.body.prev.x + ' collided:' + this.collided);

            // if (player.body.touching.none) {
            //     value = '';
            //     collided = false;
            //
            //     player.setVelocityX(0);
            //     player.setVelocityY(0);
            // }
            if (playGame) {
                eval(code);
                this.physics.velocityFromAngle(this.rotation, this.player.body.maxSpeed, this.player.body.acceleration);
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

        }

        if (this.cursors.space.isDown) {
            // this.physics.velocityFromAngle(player.body.rotation, player.body.maxSpeed, player.body.acceleration);
            // console.log(player);
            // player.setVelocityX(0);
            // player.setVelocityY(0);
            this.physics.pause();
            this.objectCollidedWith = null;
            this.scene.restart();

        }

        if (this.cursors.left.isDown || this.value === 'LEFT') {
            this.rotation = this.ROTATION_LEFT;
            this.player.setVelocityX(-160);
            this.player.setVelocityY(0);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown || this.value === 'RIGHT') {
            this.rotation = this.ROTATION_RIGHT;
            this.player.setVelocityX(160);
            this.player.setVelocityY(0);
            this.player.anims.play('right', true);
        } else {
            // player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown || this.value === 'UP') {
            this.rotation = this.ROTATION_UP;
            this.player.setVelocityX(0);
            this.player.setVelocityY(-160);
        } else if (this.cursors.down.isDown || this.value === 'DOWN') {
            this.rotation = this.ROTATION_DOWN;
            this.player.setVelocityX(0);
            this.player.setVelocityY(160);
        } else {
            // player.setVelocityY(0);
        }
// playGame = false;
        if (this.value == 'STOP') {
            // player.setVelocityX(0);
            // player.setVelocityY(0);
        }
    }
}

export default GameScene
