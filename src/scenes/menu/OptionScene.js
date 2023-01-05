import logo from "../../assets/menu/logo.png";
import { Scene } from "phaser";

class OptionScene extends Scene {
    constructor() {
        super('options');
    }
    preload() {
        this.load.image('logo', logo);
    }

    create() {
        this.add.image(400, 100, 'logo').setScale(0.15, 0.15);
        const sound = this.add.text(100, 250, 'SOUND');
        const back = this.add.text(100, 450, '<- BACK');
        back.setInteractive().on('pointerdown', () => this.scene.start('menu'));
    }

}

export default OptionScene
