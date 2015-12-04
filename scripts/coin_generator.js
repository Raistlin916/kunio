let map = {
    'line': 'ccccc',
    'twoLine': 
`
ccccc
ccccc`,
    'square':
`
ccc
ccc
ccc`
};

let keyMap = {
    c: 'coin'
}

let coinMatrix = Object.keys(map).map((key) => {
    return map[key].split('\n');
});

coinMatrix.forEach(function (matrix, index, array) {
    array[index] = matrix.filter(function (row, index) {
        if (index == 0 && row.length == 0) {
            return false;
        }
        return true;
    });
});


export default class CoinGenerator {
    constructor (game) {
        this.game = game;
        this.rnd = game.rnd;
    }

    create () {
        let rndIndex = this.rnd.integerInRange(0, coinMatrix.length-1);
        let matrix = coinMatrix[rndIndex];
        let data = [];
        for (let j = 0; j < matrix.length; j++) {
            let row = matrix[j];
            for (let i = 0; i < row.length; i++) {
                let x = i * 30;
                let y = j * 30;
                let type = keyMap[row[i]];
                data.push({x, y, type});
            }
        }
        
        return data;
    }
}