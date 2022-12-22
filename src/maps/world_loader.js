import firstWorld from './worlds/first_world';

import sky from '../assets/sky.png';
import platform from '../assets/platform.png';
import dude from '../assets/dude.png';
import star from '../assets/star.png';
import bomb from '../assets/bomb.png';

export function preload(scene) {
    scene.load.image('sky', sky);
    scene.load.image('ground', platform);
    scene.load.image('star', star);
    scene.load.image('bomb', bomb);
    scene.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
}

export function createBackground(scene) {
    scene.add.image(400, 300, 'sky');
}