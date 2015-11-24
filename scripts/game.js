export default class Game {
    
    create () {
        this.world.setBounds(0, 0, 1280, 600);
    
        this.bgtile = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'bg');
        this.bgtile.tilePosition = {x: 0, y: 1000 - this.world.height};
        this.bgtile.fixedToCamera = true;
    
        
        this.kunio = this.add.sprite(200, 200, 'kunio');
        this.kunio.animations.add('left', [0,1,2]);
        this.kunio.animations.add('right', [3,4,5]);
        
        this.camera.follow(this.kunio);
        
        this.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.physics.arcade.enable(this.kunio);
        this.kunio.body.gravity.y = 500;
        this.kunio.body.velocity.y = 100;
        this.kunio.body.collideWorldBounds = true;
        
        this.kunio.body.bounce.set(0.2);
        
        this.platforms = this.add.group();
        
        this.platforms.enableBody = true;
        
        var ground = this.platforms.create(200, this.world.height-50, 'tile');
        ground.body.immovable = true;
        
        var ground2 = this.platforms.create(216, this.world.height-50, 'tile');
        ground2.body.immovable = true;
    }
    
    update () {
        this.physics.arcade.collide(this.kunio, this.platforms);
    
        if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.kunio.x -= 2;
            this.bgtile.tilePosition.x += 2 * 0.2;
            
            if (this.bgtile.tilePosition.x > 0) {
                this.bgtile.tilePosition.x = 0;
            }
            this.kunio.animations.play('left', 15, true);
        } else if(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.kunio.x += 2;
            this.bgtile.tilePosition.x -= 2 * 0.2;
            if (this.bgtile.tilePosition.x < -800) {
                this.bgtile.tilePosition.x = -800;
            }
            this.kunio.animations.play('right', 15, true);
        } else {
            this.kunio.animations.stop();
        }
        
        if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.kunio.body.touching.down) {
            this.kunio.body.velocity.y = -300;
        }
    }
}