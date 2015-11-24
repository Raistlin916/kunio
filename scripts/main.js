/* global Phaser */

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
    
var kunio, platforms;
var bgtile;

function preload () {
    game.load.atlasJSONHash('kunio', 'asserts/kunio.png', 'asserts/kunio.json');
    game.load.image('tile', 'asserts/tile.png');
    game.load.image('bg', 'asserts/bg.jpg');
}

function create () {
    bgtile = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg');
    bgtile.tilePosition.y = game.world.height - 1000;
    bgtile.fixedToCamera = true;

    game.world.setBounds(0, 0, 1280, 600);
    
    kunio = game.add.sprite(200, 200, 'kunio');
    kunio.animations.add('left', [0,1,2]);
    kunio.animations.add('right', [3,4,5]);
    
    game.camera.follow(kunio);
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    game.physics.arcade.enable(kunio);
    kunio.body.gravity.y = 500;
    kunio.body.velocity.y = 100;
    kunio.body.collideWorldBounds = true;
    
    kunio.body.bounce.set(0.2);
    
    platforms = game.add.group();
    
    platforms.enableBody = true;
    
    var ground = platforms.create(200, game.world.height-50, 'tile');
    ground.body.immovable = true;
    
    var ground2 = platforms.create(216, game.world.height-50, 'tile');
    ground2.body.immovable = true;
}

function update () {
    game.physics.arcade.collide(kunio, platforms);
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        kunio.x -= 2;
        bgtile.tilePosition.x += 2 * 0.2;
        
        if (bgtile.tilePosition.x > 0) {
            bgtile.tilePosition.x = 0;
        }
        kunio.animations.play('left', 15, true);
    } else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        kunio.x += 2;
        bgtile.tilePosition.x -= 2 * 0.2;
        if (bgtile.tilePosition.x < -800) {
            bgtile.tilePosition.x = -800;
        }
        kunio.animations.play('right', 15, true);
    } else {
        kunio.animations.stop();
    }
    
    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && kunio.body.touching.down) {
        kunio.body.velocity.y = -300;
    }
}