/* global Phaser */
import Boot from './boot';
import Preloader from './preloader';
import Game from './game'

//var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'kunio');
var game = new Phaser.Game(600, 400, Phaser.AUTO, 'kunio');

game.state.add('Boot', Boot);
game.state.add('Preloader', Preloader);
game.state.add('Game', Game);

game.state.start('Boot');