import {Orientation, screenDims} from './utils/screen_utils';


class GroupFactory {

    constructor (group) {
        this.group = group;
        this.record = group.length;
    }

    update (camera) {
        let cacheItemCount = 0;
        this.group.children.forEach((item) => {
            let groundBounds = item.getBounds();
            if (groundBounds.left > camera.bounds.right) {
                cacheItemCount ++;
            }
            
            if (groundBounds.right < camera.bounds.left) {
                item.destroy();
            }
        });

        if ( cacheItemCount < 2 ) {
            this.createOne();
        }
    }

    getGroup () {
        return this.group;
    }

    bindCreateMethod (cb) {
        this.createOne = () => {
            let oldLength = this.group.length;
            cb(this.record);
            this.record += this.group.length - oldLength;
        }
        
    }
}

export default class Game {
    
    init () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 750;
        this.physics.arcade.skipQuadTree = false;
        this.game.renderer.renderSession.roundPixels = true;
        this.originWidth = this.world.width;
        this.world.resize(this.originWidth*3, 600);
        this.score = 0;
    }
    
    create () {
        this.bgtile = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'bg');
        this.bgtile.tilePosition.set(0, this.world.height);
        this.bgtile.position.set(0, this.world.height);
        this.bgtile.anchor.set(0, 1);
        this.bgtile.fixedToCamera = true;
    
        
        this.player = this.add.sprite(200, 200, 'mingren');
        this.player.anchor.set(1, 1);
        
        this.player.animations.add('standing', [0,1,2,3], 10, true);
        this.player.animations.add('walk', [4,5,6,7,8,9,10], 10, true);
        this.player.animations.add('jump_up', [14,15], 4, false);
        this.player.animations.add('jump_down', [16,17], 4, false);
        this.player.smoothed = false;
        
        this.camera.follow(this.player);
        
        this.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.position.set(0, this.world.height-200);
        
        
        let platforms = this.add.physicsGroup();
        this.platformsFac = new GroupFactory(platforms);
        this.platformsFac.bindCreateMethod((recordLength) => {
            let x = recordLength * 200;
            let y = this.world.height - 50 - this.rnd.integerInRange(0, 50);
            let p = platforms.create(x, y, this.rnd.integerInRange(0, 2) == 1 ? 'platform' : 'platform_ice');
            p.body.allowGravity = false;
            p.body.immovable = true;
        });

        let coinsGroup = this.add.physicsGroup();
        this.coinsFac = new GroupFactory(coinsGroup);
        this.coinsFac.bindCreateMethod((recordLength) => {
            let group = this.add.physicsGroup();
            group.position.set(recordLength * 500 + 100, this.world.height - 150);
            for (let i = 0; i < 10; i++) {
                let x = i * 30;
                let y = 0;
                group.create(x, y, 'coin');
            }
            group.callAll('animations.add', 'animations', 'flash');
            group.callAll('play', null, 'flash', 10, true);
            group.setAll('body.allowGravity', false);
            group.setAll('body.immovable', true);
            this.coinsFac.group.add(group);
        });
        
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
            spacebar: Phaser.Keyboard.SPACEBAR
        });
        
        this.scoreText = this.add.bitmapText(10, 10, 'carrier_command','score:' + this.score, 18);
        this.scoreText.tint = 0x223344;
        this.scoreText.fixedToCamera = true;
    }
    
    
    update () {
        this.bgtile.tilePosition.x = -(this.camera.x * 0.03);
        
        if (this.player.alive) {
            this.player.body.velocity.x = 200;
            this.player.animations.play('walk');
        } else {
            this.player.body.velocity.x = 0;
            this.player.animations.play('standing'); 
        }

        let touchPlatform = this.physics.arcade.collide(this.player, this.platformsFac.getGroup(), 
            this.onCollidePlatform, null, this);

        this.coinsFac.getGroup().forEach((coinsGroup) => {
            this.physics.arcade.overlap(this.player, coinsGroup, this.eatCoin, null, this);
        });
        
        let standing = this.player.body.blocked.down || (this.player.body.touching.down && touchPlatform);
        if (!standing) {
            this.player.animations.play('jump_' + (this.player.body.velocity.y > 0 ? 'down' : 'up') );
        }
        
        if (this.keys.spacebar.isDown && standing && this.player.alive) {
            this.player.body.velocity.y = -300;
        }
        
        if (this.player.body.blocked.down) {
            this.dead();
        }

        this.platformsFac.update(this.camera);
        this.coinsFac.update(this.camera);

        if (this.world.width - this.player.x < this.camera.width) {
            this.world.resize(this.world.width + this.camera.width, this.world.height);
        }
    }
    
    dead () {
        this.player.alive = false;
    }
    
    onCollidePlatform (player, platform) {
        if (platform.key === 'platform_ice') {
            this.player.body.velocity.x *= 1.5;
        }
    }
    
    eatCoin (player, coin) {
        coin.kill();
        this.score += 10;
        this.scoreText.setText('score:' + this.score);
    }
    
    
}