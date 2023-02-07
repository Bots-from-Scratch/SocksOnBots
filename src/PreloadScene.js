import {Scene} from "phaser";

class PreloadScene extends Scene {
constructor() {
    super('PreloadScene');
}
    preload() {

    }

    create() {
        this.playButton_lvl_1 = this.add.text(100, 100, 'Start Level 1');
        this.playButton_lvl_1.setInteractive();
        this.playButton_lvl_1.on('pointerover', () => this.playButton_lvl_1.setStyle({fill: '#006db2'})).on('pointerout', () => this.playButton_lvl_1.setStyle({fill: '#fff'})).on('pointerdown', () => this.scene.start('GameScene_Level_1'));

        this.playButton_lvl_2 = this.add.text(100, 150, 'Start Level 2');
        this.playButton_lvl_2.setInteractive();
        this.playButton_lvl_2.on('pointerover', () => this.playButton_lvl_2.setStyle({fill: '#006db2'})).on('pointerout', () => this.playButton_lvl_2.setStyle({fill: '#fff'})).on('pointerdown', () => this.scene.start('GameScene_Level_2'));

        this.playButton_lvl_3 = this.add.text(100, 200, 'Start Level 3');
        this.playButton_lvl_3.setInteractive();
        this.playButton_lvl_3.on('pointerover', () => this.playButton_lvl_3.setStyle({fill: '#006db2'})).on('pointerout', () => this.playButton_lvl_3.setStyle({fill: '#fff'})).on('pointerdown', () => this.scene.start('GameScene_Level_3'));
    }

}

export default PreloadScene
