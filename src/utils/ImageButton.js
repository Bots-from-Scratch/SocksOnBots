export class ImageButton extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, text, nextScene) {
        super(scene, x, y, text, style);

        scene.add.text(100, 250, text).setFontSize(24).setFontStyle('bold');

        this.setInteractive({ useHandCursor: true })
            .on('pointerdown', () => scene.start(nextScene))
    }
}

module.exports = ImageButton;