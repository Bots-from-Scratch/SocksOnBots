import logo from "../../assets/menu/logo.svg";
import button from "../../assets/menu/button.png";
import block from "../../assets/menu/block.png";
import { Scene } from "phaser";

class MenuScene extends Scene {
    constructor() {
        super('menu');
    }

    init() {
        const cursors = this.input.keyboard.createCursorKeys();
    }

    preload() {
        this.load.svg('logo', logo);
        this.load.image('button', button);
        this.load.image('block', block);
    }

    getNextButton(state) {
        if(state === 0) return menuItems.length - 1;
        if(state === menuItems.length -1) return 0;
        return menuState + state;
    }

    create() {
        this.add.image(475, 100, 'logo').setScale(1, 1); // Logo
        let menuState = 0;

        const startGameButton = this.add.text(100, 250, 'START GAME').setFontSize(24).setFontStyle('bold');
        const optionsButton = this.add.text(100, 350, 'OPTIONS').setFontSize(20);
        const creditsButton = this.add.text(100, 450, 'CREDITS').setFontSize(20);

        const menuItems = [startGameButton, optionsButton, creditsButton];

        console.log(startGameButton.getLeftCenter(), startGameButton.y);

        startGameButton.setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('game'));

        optionsButton.setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('options'));
        // .on('pointerover', () => menuPointer.setY(this.displayHeight));
        creditsButton.setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('credits'));

        let menuPointer = this.add.rectangle(60, menuItems[menuState].y + (menuItems[menuState].displayHeight / 2), 10, 10).setFillStyle(16777215);
    }

    update() {
        
        const upJustPressed = Phaser.Input.Keyboard.JustDown(cursors.up);
        const downJustPressed = Phaser.Input.Keyboard.JustDown(cursors.down);

        if(upJustPressed) {
            console.log(selectNextButton(-1));
        }
        if(downJustPressed) {
            console.log(selectNextButton(1));
        }

    }
}

export default MenuScene
