

export default class CoinGenerator {
    constructor (game) {
        this.game = game;
        this.rnd = game.rnd;
        this.queue = [];
    }

    create () {
        let data = [];
        for (let i = 0; i < 10; i++) {
            let x = i * 30;
            let y = 0;
            let type = 'coin';
            data.push({x, y, type});
        }
        return data;
    }
}