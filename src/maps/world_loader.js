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

export function setPlatforms(scene) {
    return scene.physics.add.staticGroup();

    // group.create(400, 568, 'ground').setScale(2).refreshBody();
    // group.create(300, 100, 'ground').setScale(0.3, 1.2).refreshBody().setSize(150, 42, true);
    // group.create(600, 400, 'ground');
    // group.create(50, 250, 'ground');
    // group.create(750, 220, 'ground');

    // group.setSize(400, 50, true);

    // group.setTint(0x000bbb).refreshBody();
}