let platformLibrary = {
    'xs': 2,
    's': 3,
    'm': 5,
    'l': 10,
    'xl': 15,
    'xxl': 20
};
for (let key in platformLibrary) {
    let a = new Array(platformLibrary[key]);
    a.fill(1);
    a.unshift(0);
    a.push(3);
    platformLibrary[key] = a;
}

let platformCombos = [
    's,xs,s,xs',
    'm,l',
    'm,xs,xs,xs,l',
    's,s,m,s,s,l'
];

platformCombos.forEach((item, key, array)=>{
    array[key] = item.split(',');
});

export default class PlatformGenerator {
    constructor (game) {
        this.game = game;
        this.rnd = game.rnd;
        this.queue = 'xxl,m,m,xs,xs,xs,m'.split(',');
    }

    create () {
        let platformIndex;
        let platformKey;
        if (!this.queue.length) {
            let rndIndex = this.rnd.integerInRange(0, platformCombos.length-1);
            this.queue = Array.from(platformCombos[rndIndex]);
        }
        platformKey = this.queue.shift();
        return {
            array: platformLibrary[platformKey],
            type: this.rnd.integerInRange(0, 1) == 1 ? 'platform_sheet' : 'platform_ice_sheet',
            y: this.rnd.integerInRange(-30, 30)
        }
    }
}