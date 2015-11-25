import {Orientation, screenDims} from './utils/screen_utils';

export default class Game {
    
    init () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 750;
        this.physics.arcade.skipQuadTree = false;
        this.game.renderer.renderSession.roundPixels = true;
        this.world.resize(2000, 600);
    }
    
    create () {
        this.bgtile = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'bg');
        this.bgtile.tilePosition.set(0, this.world.height);
        this.bgtile.position.set(0, this.world.height);
        this.bgtile.anchor.set(0, 1);
        this.bgtile.fixedToCamera = true;
    
        
        this.player = this.add.sprite(200, 200, 'kunio');
        this.player.animations.add('left', [0,1,2], 10, true);
        this.player.animations.add('right', [3,4,5], 10, true);
        
        
        this.camera.follow(this.player);
        
        this.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.body.bounce.set(0.2);
        this.player.position.set(0, this.world.height);
        
        this.platforms = this.add.physicsGroup();
        
        
        this.platforms.create(200, this.world.height-50, 'tile');
        this.platforms.create(216, this.world.height-50, 'tile');

        
        this.platforms.setAll('body.allowGravity', false);
        this.platforms.setAll('body.immovable', true);
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
            spacebar: Phaser.Keyboard.SPACEBAR
        });
    }
    
    update () {
        this.physics.arcade.collide(this.player, this.platforms);
        this.bgtile.tilePosition.x = -(this.camera.x * 0.1);
        
        this.player.body.velocity.x = 0;
        
        let standing = this.player.body.blocked.down || this.player.body.touching.down;
    
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -200;
            this.player.animations.play('left');
        } else if(this.cursors.right.isDown) {
            this.player.body.velocity.x = 200;
            this.player.animations.play('right');
        } else {
            this.player.animations.stop();
        }
        
        if(this.keys.spacebar.isDown && standing) {
            this.player.body.velocity.y = -300;
        }
    }
}