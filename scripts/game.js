import {Orientation, screenDims} from './utils/screen_utils';

export default class Game {
    
    init () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 750;
        this.physics.arcade.skipQuadTree = false;
        this.game.renderer.renderSession.roundPixels = true;
        this.world.resize(2000, 600);
        this.score = 0;
    }
    
    create () {
        this.bgtile = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'bg');
        this.bgtile.tilePosition.set(0, this.world.height);
        this.bgtile.position.set(0, this.world.height);
        this.bgtile.anchor.set(0, 1);
        this.bgtile.fixedToCamera = true;
    
        
        this.player = this.add.sprite(200, 200, 'mingren');
        this.player.anchor.set(.5, 1);
        
        this.player.animations.add('standing', [0,1,2,3], 10, true);
        this.player.animations.add('walk', [4,5,6,7,8,9,10], 10, true);
        this.player.animations.add('jump_up', [14,15], 4, false);
        this.player.animations.add('jump_down', [16,17], 4, false);
        this.player.smoothed = false;
        
        this.camera.follow(this.player);
        
        this.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        //this.player.body.bounce.set(0.2);
        this.player.position.set(0, this.world.height-200);
        
        this.platforms = this.add.physicsGroup();
        for (let i = 0; i < 10; i++) {
            let x = i * 250;
            let y = this.world.height - 50 - this.rnd.between(0, 50);
            this.platforms.create(x, y, ~~this.rnd.between(0, 2) == 1 ? 'platform' : 'platform_ice');
        }
        this.platforms.setAll('body.allowGravity', false);
        this.platforms.setAll('body.immovable', true);
        
        this.coinsGroup = this.add.physicsGroup();
        for (let i = 0; i < 10; i++) {
            let x = i * 30 + 100;
            let y = this.world.height - 150;
            this.coinsGroup.create(x, y, 'coin');
        }
        this.coinsGroup.callAll('animations.add', 'animations', 'flash');
        this.coinsGroup.callAll('play', null, 'flash', 10, true);
        this.coinsGroup.setAll('body.allowGravity', false);
        this.coinsGroup.setAll('body.immovable', true);
        
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
            spacebar: Phaser.Keyboard.SPACEBAR
        });
        
        this.scoreText = this.add.bitmapText(10, this.world.height - this.camera.height + 10, 'carrier_command','score:' + this.score, 18);
        this.scoreText.tint = 0x223344;
    }
    
    
    update () {
        this.physics.arcade.collide(this.player, this.platforms);
        this.bgtile.tilePosition.x = -(this.camera.x * 0.1);
        
        this.physics.arcade.collide(this.player, this.platforms, this.setFriction, null, this);
        this.physics.arcade.overlap(this.player, this.coinsGroup, this.eatCoin, null, this);
        
        this.player.body.velocity.x = 0;
        
        let standing = this.player.body.blocked.down || this.player.body.touching.down;
        

        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -200;
            this.facing = 'left';
            standing && this.player.animations.play('walk');
        } else if(this.cursors.right.isDown) {
            this.player.body.velocity.x = 200;
            this.facing = 'right';
            standing && this.player.animations.play('walk');
        } else {
            standing && this.player.animations.play('standing');
        }
        
        if (!standing) {
            this.player.animations.play('jump_' + (this.player.body.velocity.y > 0 ? 'down' : 'up') );
        }
        
        if(this.keys.spacebar.isDown && standing) {
            this.player.body.velocity.y = -300;
            this.player.animations.play('jump');
        }
        
        this.player.scale.x = this.facing == 'left' ? -1 : 1;
        this.scoreText.setText('score:' + this.score);
    }
    
    setFriction (player, platform) {
        if (platform.key === 'platform_ice') {
            
        }
    }
    
    eatCoin (player, coin) {
        coin.kill();
        this.score += 10;
    }
    
    
}