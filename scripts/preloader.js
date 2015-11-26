export default class Preloader {
    preload () {
        this.load.atlasJSONHash('kunio', 'assets/kunio.png', 'assets/kunio.json');
        this.load.atlasJSONHash('mingren', 'assets/mingren.png', 'assets/mingren.json');
        this.load.image('tile', 'assets/tile.png');
        this.load.image('bg', 'assets/bg.jpg');
        this.load.image('platform', 'assets/platform.png');
        this.load.image('platform_ice', 'assets/platform_ice.png');
    }
    create () {
        this.state.start('Game');
    }
}