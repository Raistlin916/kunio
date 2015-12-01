/* global Phaser */
import Boot from './boot';
import Preloader from './preloader';
import Game from './game';
import ScreenUtils, {Orientation} from './utils/screen_utils';

import test from './test';

    
let screenDims = ScreenUtils.calculateScreenMetrics(800, 500, Orientation.LANDSCAPE);


let game = new Phaser.Game(screenDims.gameWidth, screenDims.gameHeight, Phaser.AUTO, 'kunio');


game.state.add('Boot', Boot);
game.state.add('Preloader', Preloader);
game.state.add('Game', Game);
game.state.add('test', test);

game.state.start('Boot');