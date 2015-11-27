export default class Preloader {
    preload () {
        this.load.atlasJSONHash('kunio', 'assets/kunio.png', 'assets/kunio.json');
        this.load.atlasJSONHash('mingren', 'assets/mingren.png', 'assets/mingren.json');
        this.load.spritesheet('coin', 'assets/coin.png', 24, 24);
        this.load.image('tile', 'assets/tile.png');
        this.load.image('bg', 'assets/bg.jpg');
        this.load.image('platform', 'assets/platform.png');
        this.load.image('platform_ice', 'assets/platform_ice.png');
        this.load.bitmapFont('carrier_command', 'assets/carrier_command.png', 'assets/carrier_command.xml');
    }
    create () {
        this.state.start('Game');
    }
}