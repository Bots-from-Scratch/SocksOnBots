import Phaser from 'phaser';
import sky from './assets/sky.png';
import platform from './assets/platform.png';
import dude from './assets/dude.png';
import star from './assets/star.png';
import bomb from './assets/bomb.png';

var player;
var stars;
var platforms;
var cursors;
var score = 0;
var scoreText;
var bombs;

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

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        player = this.physics.add.sprite(100, 450, 'dude');

        player.setCollideWorldBounds(true);

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

        stars = this.physics.add.group({
            key: 'star',
            frameQuantity: 5,
            // setXY: { x: Phaser.Math.Between(10, 450), y: Phaser.Math.Between(10, 790), stepX: Phaser.Math.Between(10, 90) }
        });
        var rect = new Phaser.Geom.Rectangle(0, 0, 800, 600);

        Phaser.Actions.RandomRectangle(stars.getChildren(), rect);

        stars.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        scoreText = this.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#000'});

        bombs = this.physics.add.group();

        this.physics.add.collider(bombs, platforms);
        this.physics.add.collider(player, bombs, hitBomb, null, this);

        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);

        this.physics.add.overlap(player, stars, collectStar, null, this);
    }

    update() {
        if (cursors.left.isDown) {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);

            player.anims.play('right', true);
        } else {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown) {
            player.setVelocityY(-160);
        } else if (cursors.down.isDown) {
            player.setVelocityY(160);
        } else {
            player.setVelocityY(0);
        }
    }
}

function collectStar(player, star) {
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0) {
        stars.children.iterate(function (child) {
            child.enableBody(false, child.x, 100, true, true);
        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }

}

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
            debug: false
        }
    },
    scene: MyGame
};

const game = new Phaser.Game(config);
