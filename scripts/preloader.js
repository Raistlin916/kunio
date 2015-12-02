export default class Preloader {
    preload () {
        this.load.atlasJSONHash('mingren', 'assets/mingren.png', 'assets/mingren.json');
        this.load.spritesheet('coin', 'assets/coin.png', 24, 24);
        this.load.spritesheet('platform_ice_sheet', 'assets/platform_ice.png', 32, 32);
        this.load.spritesheet('platform_sheet', 'assets/platform.png', 35, 32);
        this.load.image('bg', 'assets/bg.jpg');
        this.load.image('platform', 'assets/platform.png');
        this.load.image('platform_ice', 'assets/platform_ice.png');
        this.load.bitmapFont('carrier_command', 'assets/carrier_command.png', 'assets/carrier_command.xml');
    }
    create () {
        this.state.start('Game');
        document.querySelector('.loading-wrap').remove();
    }
}