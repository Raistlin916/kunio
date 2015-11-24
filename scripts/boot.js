export default class Boot {
    init () {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop) {
            //this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            //this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
        } else {
            //this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            //this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.setResizeCallback(this.gameResized, this);
        }
    }
    
    create () {
        this.state.start('Preloader');
    }
    
    gameResized (width, height) {
        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device or resizing the browser window.
        //  Note that this callback is only really useful if you use a ScaleMode of RESIZE and place it inside your main game state.
    }
}

