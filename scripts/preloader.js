export default class Preloader {
    preload () {
        this.load.atlasJSONHash('kunio', 'assets/kunio.png', 'assets/kunio.json');
        this.load.image('tile', 'assets/tile.png');
        this.load.image('bg', 'assets/bg.jpg');
    }
    create () {
        this.state.start('Game');
    }
}