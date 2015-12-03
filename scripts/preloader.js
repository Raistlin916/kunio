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
        this.load.onFileComplete.add(this.onFileLoaded, this);
        this.loadingProgress = document.querySelector('.loading-progress');
    }
    create () {
        let loadingElement = document.querySelector('.loading-wrap');
        let gameWrap = document.getElementById('game-wrap');
        setTimeout(() => {
            loadingElement.remove();
        }, 1000);
        setTimeout(() => {
            gameWrap.classList.add('fade-in');
        }, 400);
        setTimeout(() => {
            loadingElement.classList.add('fade-out');
            this.state.start('Game');
        }, 300);
        
    }

    onFileLoaded (progress, cacheKey, success, totalLoaded, totalFiles) {
        this.loadingProgress.innerText = progress + '%';
    }
}