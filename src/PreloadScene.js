import logo from "./assets/menu/logo.png";
import {Scene} from "phaser";

class PreloadScene extends Scene {
constructor() {
    super('preload');
}
    preload() {
        this.load.image('logo', logo);
    }

    create() {
        this.add.image(400, 50, 'logo');
        const playButton = this.add.text(100, 250, 'START GAME');
        const options = this.add.text(100, 350, 'OPTIONS');
        const credits = this.add.text(100, 450, 'CREDITS');
        playButton.setInteractive();
        playButton.on('pointerdown', () => this.scene.start('game'));
        // this.input.on('pointerdown', () => this.scene.start('game'));
    }

}

export default PreloadScene
