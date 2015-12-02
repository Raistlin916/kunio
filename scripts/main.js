/* global Phaser */
import Boot from './boot';
import Preloader from './preloader';
import Game from './game';
import ScreenUtils, {Orientation} from './utils/screen_utils';
    
let screenDims = ScreenUtils.calculateScreenMetrics(
    document.documentElement.clientWidth
    , document.documentElement.clientHeight
    , Orientation.PORTRAIT);


let game = new Phaser.Game(screenDims.gameWidth, screenDims.gameHeight, Phaser.AUTO, 'kunio');

game.state.add('Boot', Boot);
game.state.add('Preloader', Preloader);
game.state.add('Game', Game);

game.state.start('Boot');