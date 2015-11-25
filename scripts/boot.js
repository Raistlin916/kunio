import {Orientation, screenDims} from './utils/screen_utils';

export default class Boot {
    init (game) {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = false;

        if (this.game.device.desktop) {
            this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
            this.scale.setUserScale(screenDims.scaleX, screenDims.scaleY);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
        }
        else {
            this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
            this.scale.setUserScale(screenDims.scaleX, screenDims.scaleY);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
        }

    }
    
    create () {
        this.state.start('Preloader');
    }

}

