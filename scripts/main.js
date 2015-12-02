/* global Phaser */
import Boot from './boot';
import Preloader from './preloader';
import Game from './game';
import ScreenUtils, {Orientation} from './utils/screen_utils';
    

let w = window.innerWidth;
let h = window.innerHeight;

if ( w > h) {
    w = 600;
    h = 300;
} else {
    w = 300;
    h = 600;
}

let screenDims = ScreenUtils.calculateScreenMetrics( w, h, 
    w > h ? Orientation.LANDSCAPE : Orientation.PORTRAIT);


let game = new Phaser.Game(screenDims.gameWidth, screenDims.gameHeight, Phaser.AUTO, 'kunio');
game.state.add('Boot', Boot);
game.state.add('Preloader', Preloader);
game.state.add('Game', Game);

game.state.start('Boot');