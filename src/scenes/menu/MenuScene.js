import logo from "../../assets/menu/logo.png";
import {Scene} from "phaser";

class MenuScene extends Scene {
constructor() {
    super('menu');
}
    preload() {
        this.load.image('logo', logo);
    }

    create() {
        this.add.image(400, 50, 'logo');
        const playButton = this.add.text(100, 250, 'START GAME');
        const options = this.add.text(100, 350, 'OPTIONS');
        const credits = this.add.text(100, 450, 'CREDITS');

        playButton.setInteractive().on('pointerdown', () => this.scene.start('game'));
        options.setInteractive().on('pointerdown', () => this.scene.start('options'));
        credits.setInteractive().on('pointerdown', () => this.scene.start('credits'))
    }

}

export default MenuScene
