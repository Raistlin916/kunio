export default class test {
    init () {
        this.world.resize(10000, 10000);
        this.physics.startSystem(Phaser.Physics.ARCADE);
    }

    create () {
        let group = this.add.physicsGroup();
        [0, 1, 1, 1, 1, 1, 3].forEach((index, i)=> {
            let sprite = this.add.sprite(i * 32, 0, 'platform_ice_sheet', index);
            group.add(sprite);
        });
        group.position.set(100, 100);

        let group2 = this.add.physicsGroup();
        [0, 1, 1, 1, 1, 3].forEach((index, i)=> {
            let sprite = this.add.sprite(i * 32, 0, 'platform_ice_sheet', index);
            group2.add(sprite);
        });
        group2.position.set(300, 200);
    }

    update () {
        this.camera.x += 1;
    }

}
