let platformLibrary = [
    2,
    5,
    10,
    20
];

platformLibrary.forEach(function (item, index) {
    let a = new Array(item);
    a.fill(1);
    a.unshift(0);
    a.push(3);
    platformLibrary[index] = a;
});


export default class PlatformGenerator {
    constructor (game) {
        this.game = game;
        this.rnd = game.rnd;
    }

    create () {
        let dataIndex = this.rnd.integerInRange(0, platformLibrary.length-1);
        return {
            array: platformLibrary[dataIndex],
            type: this.rnd.integerInRange(0, 1) == 1 ? 'platform_sheet' : 'platform_ice_sheet',
            y: this.rnd.integerInRange(-30, 30)
        }
    }
}