import { Scene } from "phaser";

class CreditScene extends Scene {
    constructor() {
        super('credits');
    }
    preload() {}

    create() {
        const Text = this.add.text(100, 250, 'Im Aufbau');
        const back = this.add.text(100, 450, '<- BACK');
        back.setInteractive().on('pointerdown', () => this.scene.start('menu'));
    }

}

export default CreditScene
