import logo from "../../assets/menu/logo.png";
import button from "../../assets/menu/button.png";
import block from "../../assets/menu/block.png";
import { Scene } from "phaser";

class MenuScene extends Scene {
    constructor() {
        super('menu');
    }
    preload() {
        this.load.image('logo', logo);
        this.load.image('button', button);
        this.load.image('block', block);
    }

    create() {
        this.add.image(400, 100, 'logo').setScale(0.15, 0.15);

        const playButton = this.add.text(100, 250, 'START GAME').setFontSize(24).setFontStyle('bold');
        const options = this.add.text(100, 350, 'OPTIONS').setFontSize(20);
        const credits = this.add.text(100, 450, 'CREDITS').setFontSize(20);

        console.log(playButton.getLeftCenter());

        const menuPointer = this.add.rectangle(60, 250 + (playButton.displayHeight / 2), 10, 10).setFillStyle(16777215);

        playButton.setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('game'));
        options.setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('options'));
            // .on('pointerover', () => menuPointer.setY(this.displayHeight));
        credits.setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('credits'));
    }

}

export default MenuScene
