import {Scene} from "phaser";

class PreloadScene extends Scene {
constructor() {
    super('preload');
}
    preload() {

    }

    create() {
        const playButton = this.add.text(100, 100, 'Start Game')
        this.input.on('pointerdown', () => this.scene.start('game'))
    }

}

export default PreloadScene
