import {Orientation, screenDims} from './utils/screen_utils';
import PlatformGenerator from './platform_generator';
import CoinGenerator from './coin_generator';


class GroupFactory {

    constructor (group) {
        this.group = group;
        this.record = group.length || 0;
        this.lastOne = null;
    }

    update (camera) {
        let cacheItemCount = 0;
        this.group.children.forEach((item) => {
            let groundBounds = item.getBounds();

            if (groundBounds.left > camera.width) {
                cacheItemCount ++;
            }
            
            if (groundBounds.right < 0) {
                item.destroy();
            }
        });

        if ( cacheItemCount < 2 ) {
            this.lastOne = this.createOne();
            if (this.lastOne == undefined) {
                return;
            }
            this.group.add(this.lastOne);
        }
    }

    bindCreateMethod (cb) {
        this.createOne = () => {
            let result = cb(this.record, this.lastOne);
            this.record ++;

            return result;
        }
    }

    createOne (){}
}

export default class Game {
    
    init () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 750;
        this.physics.arcade.skipQuadTree = false;
        this.game.renderer.renderSession.roundPixels = true;
        this.originWidth = this.camera.width;
        this.world.resize(this.originWidth*3, this.camera.height);
        this.score = 0;
    }
    
    create () {
        this.bgtile = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'bg');
        this.bgtile.tilePosition.set(0, this.world.height);
        this.bgtile.position.set(0, this.world.height);
        this.bgtile.anchor.set(0, 1);
        this.bgtile.fixedToCamera = true;
        
        this.player = this.add.sprite(50, this.world.height-200, 'mingren');
        this.player.anchor.set(1, 1);
        
        this.player.animations.add('standing', [0,1,2,3], 10, true);
        this.player.animations.add('walk', [4,5,6,7,8,9,10], 10, true);
        this.player.animations.add('jump_up', [14,15], 4, false);
        this.player.animations.add('jump_down', [16,17], 4, false);
        this.player.animations.add('fail', [19, 20, 21, 22], 5, false);
        this.player.animations.add('fail_after', [23,24], 4, true);
        this.player.smoothed = false;
        
        
        this.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        
        
        let platforms = this.add.physicsGroup();
        let platformGenerator = new PlatformGenerator(this.game);
        this.platformsFac = new GroupFactory(platforms);
        this.platformsFac.bindCreateMethod((recordLength, lastOne) => {
            let group = this.add.physicsGroup();
            let x = lastOne ? (lastOne.x + lastOne.width + 150) : 0;
            group.position.set(x, this.world.height - 100 - this.game.rnd.integerInRange(-30, 30));
            
            let platformData = platformGenerator.create();
            platformData.forEach((item, i)=> {
                let sprite = this.add.sprite(item.x, item.y, item.type, item.index);
                group.add(sprite);
            });
            group.setAll('body.allowGravity', false);
            group.setAll('body.immovable', true);

            if (recordLength % 7 == 6) {
                this.createCoin(group.x + group.width/2, group.y - group.height);
            }

            return group;
        });

        let coinsGroup = this.add.physicsGroup();
        this.coinGenerator = new CoinGenerator(this.game);
        this.coinsFac = new GroupFactory(coinsGroup);
        
        this.keys = this.input.keyboard.addKeys({
            spacebar: Phaser.Keyboard.SPACEBAR
        });

        
        this.scoreText = this.add.bitmapText(10, 10, 'carrier_command','score:' + this.score, 18);
        this.scoreText.tint = 0x223344;
        this.scoreText.fixedToCamera = true;
        this.playFail = false;
        this.cameraFollow();
    }

    createCoin (x, y) {
        let group = this.add.physicsGroup();
        let platform = this.platformsFac.group.children[this.platformsFac.group.length-1];
        if (platform == undefined) {
            return;
        }
        let platformBounds = platform.getBounds();
        let coinData = this.coinGenerator.create();
        coinData.forEach((item) => {
            group.create(item.x, item.y, item.type);
        });

        group.position.set(x - group.width/2, y);
        
        group.callAll('animations.add', 'animations', 'flash');
        group.callAll('play', null, 'flash', 10, true);
        group.setAll('body.allowGravity', false);
        group.setAll('body.immovable', true);
        
        this.coinsFac.group.add(group);
    }
    
    
    update () {
        this.cameraFollow();
        this.bgtile.tilePosition.x = -(this.camera.x * 0.03);

        if (this.player.alive) {
            this.player.body.velocity.x = 300;
            this.player.animations.play('walk');
        } else {
            this.player.body.velocity.x = 0;
            if (!this.playFail) {
                this.player.animations.play('fail');
                this.player.animations.currentAnim.onComplete.addOnce(() => {
                    this.player.animations.play('fail_after');
                    this.input.onDown.add(() => {
                        this.state.start('Game');
                    });
                });
                this.playFail = true;
            }
        }

        let touchPlatform = false;
        this.platformsFac.group.forEach((platform) => {
            let result = this.physics.arcade.collide(this.player, platform, this.onCollidePlatform, null, this);
            if (result) {
                touchPlatform = result;
            }
        });

        this.coinsFac.group.forEach((coinsGroup) => {
            this.physics.arcade.overlap(this.player, coinsGroup, this.eatCoin, null, this);
        });
        
        let standing = this.player.body.blocked.down || (this.player.body.touching.down && touchPlatform);
        if (!standing) {
            this.player.animations.play('jump_' + (this.player.body.velocity.y > 0 ? 'down' : 'up') );
        }

        if (this.inputJump() && standing && this.player.alive) {
            this.player.body.velocity.y = -300;
        }
        
        if (this.player.body.blocked.down) {
            this.dead();
        }

        this.platformsFac.update(this.camera);
        this.coinsFac.update(this.camera);

        if (this.world.width - this.player.x < this.originWidth) {
            this.world.resize(this.world.width + this.originWidth, this.world.height);
        }
    }
    
    dead () {
        this.player.alive = false;
    }

    inputJump () {
        return this.input.pointer1.isDown 
            || this.keys.spacebar.isDown
            || this.input.mousePointer.isDown;
    }
    
    onCollidePlatform (player, platform) {
        if (platform.key === 'platform_ice_sheet') {
            this.player.body.velocity.x *= 1.5;
        }
    }
    
    eatCoin (player, coin) {
        coin.kill();
        this.score += 10;
        this.scoreText.setText('score:' + this.score);
    }

    cameraFollow () {
        this.camera.focusOnXY(this.player.x + this.camera.width/2 - 50, this.player.y);
    }
    
    
}