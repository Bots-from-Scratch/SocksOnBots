import {Scene} from "phaser";
import wear_sock_sprite_png from './assets/cutscene/cutscene-first-sock.png';
import wear_sock_sprite_json from './assets/cutscene/cutscene-first-sock.json';

class CutSceneFirstSock extends Scene {
constructor() {
    super('CutSceneFirstSock');
}
    preload() {
        this.load.aseprite('cutscene-first-sock', wear_sock_sprite_png, wear_sock_sprite_json);
    }

    create() {

        this.anims.createFromAseprite('cutscene-first-sock');

        this.sprite = this.add.sprite(500, 350, 'cutscene-first-sock').setScale(1.2);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.sprite.play({key: 'wear_sock'});
        // this.cameras.main.fadeOut(2000, 0, 0, 0)


    }

    update() {


        if (this.cursors.left.isDown) {this.cameras.main.fadeOut(2000, 0, 0, 0);}
            }

}

export default CutSceneFirstSock
