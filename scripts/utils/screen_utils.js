class ScreenMetrics {
    construtor () {
        this.windowWidth = null;
        this.windowHeight = null;

        this.defaultGameWidth = null;
        this.defaultGameHeight = null;
        this.maxGameWidth = null;
        this.maxGameHeight = null

        this.gameWidth = null;
        this.gameHeight = null;
        this.scaleX = null;
        this.scaleY = null;
        this.offsetX = null;
        this.offsetY = null;
    }
}

export let screenDims = new ScreenMetrics();

export const Orientation = { PORTRAIT: Symbol('PORTRAIT'), LANDSCAPE: Symbol('LANDSCAPE') };

export default {
    calculateScreenMetrics: (aDefaultWidth, aDefaultHeight
        , aOrientation = Orientation.LANDSCAPE
        , aMaxGameWidth, aMaxGameHeight) => {
        // get dimension of window
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
    
    
        // swap if window dimensions do not match orientation
        if ((windowWidth < windowHeight && aOrientation === Orientation.LANDSCAPE) ||
            (windowHeight < windowWidth && aOrientation === Orientation.PORTRAIT)) {
            var tmp = windowWidth;
            windowWidth = windowHeight;
            windowHeight = tmp;
        }
    
    
        // calculate max game dimension. The bounds are iPad and iPhone 
        if (typeof aMaxGameWidth === "undefined" || typeof aMaxGameHeight === "undefined") {
            if (aOrientation === Orientation.LANDSCAPE) {
                aMaxGameWidth = Math.round(aDefaultWidth * 1420 / 1280);
                aMaxGameHeight = Math.round(aDefaultHeight * 960 / 800);
            } else {
                aMaxGameWidth = Math.round(aDefaultWidth * 960 / 800);
                aMaxGameHeight = Math.round(aDefaultHeight * 1420 / 1280);
            }
        }
    
    
        // default aspect and current window aspect
        var defaultAspect = (aOrientation === Orientation.LANDSCAPE) ? 1280 / 800 : 800 / 1280;
        var windowAspect = windowWidth / windowHeight;
    
        var offsetX = 0;
        var offsetY = 0;
        var gameWidth = 0;
        var gameHeight = 0;
    
        //if (aOrientation === Orientation.LANDSCAPE) {
            // "iPhone" landscape ... and "iPad" portrait
            if (windowAspect > defaultAspect) {
                gameHeight = aDefaultHeight;
                gameWidth = Math.ceil((gameHeight * windowAspect) / 2.0) * 2;
                gameWidth = Math.min(gameWidth, aMaxGameWidth);
                offsetX = (gameWidth - aDefaultWidth) / 2;
                offsetY = 0;
            } else {    // "iPad" landscpae ... and "iPhone" portrait
                gameWidth = aDefaultWidth;
                gameHeight = Math.ceil((gameWidth / windowAspect) / 2.0) * 2;
                gameHeight = Math.min(gameHeight, aMaxGameHeight);
                offsetX = 0;
                offsetY = (gameHeight - aDefaultHeight) / 2;
            }
        // } else {    // "iPhone" portrait

        //     if (windowAspect < defaultAspect) {
        //         gameWidth = aDefaultWidth;
        //         gameHeight = gameWidth / windowAspect;
        //         gameHeight = Math.min(gameHeight, aMaxGameHeight);
        //         offsetX = 0;
        //         offsetY = (gameHeight - aDefaultHeight) / 2;
        //     } else {    // "iPad" portrait
        //         gameHeight = aDefaultHeight;
        //         gameWidth = gameHeight = windowAspect;
        //         gameWidth = Math.min(gameWidth, aMaxGameWidth);
        //         offsetX = (gameWidth - aDefaultWidth) / 2;
        //         offsetY = 0;
        //     }
        // }
    
    
        // calculate scale
        var scaleX = windowWidth / gameWidth;
        var scaleY = windowHeight / gameHeight;
    
    
        // store values
        screenDims = new ScreenMetrics();
        screenDims.windowWidth = windowWidth;
        screenDims.windowHeight = windowHeight;
    
        screenDims.defaultGameWidth = aDefaultWidth;
        screenDims.defaultGameHeight = aDefaultHeight;
        screenDims.maxGameWidth = aMaxGameWidth;
        screenDims.maxGameHeight = aMaxGameHeight;
        
        screenDims.gameWidth = gameWidth;
        screenDims.gameHeight = gameHeight;
        screenDims.scaleX = scaleX;
        screenDims.scaleY = scaleY;
        screenDims.offsetX = offsetX;
        screenDims.offsetY = offsetY;

        return screenDims;
    }
}