let map = {
'line': 'ccccc',
'dot': 'ccc ccc ccc',

'smile':
`
 cc   cc
 cc   cc


c       c
 c     c
   ccc 
`,

'ball':
`
 ccc
c   c
c   c 
 ccc`,

'love':
`
  c    c  c       c cccc
  c   c c  c     c  c
  c  c   c  c   c   cccc
  c   c c    c c    c
  ccc  c      c     cccc
`,

'gk':
`
      cccc    c    c
    c         c  c
   c    cc    c c
   c      c   c  c
    c    c    c   c
      cc      c    c
`

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
        matrix = matrix.slice().reverse();
        let data = [];
        for (let j = 0; j < matrix.length; j++) {
            let row = matrix[j];
            for (let i = 0; i < row.length; i++) {
                let x = i * 20;
                let y = -j * 30;
                let type = keyMap[row[i]];
                if (type == undefined) {
                    continue;
                }
                data.push({x, y, type});
            }
        }
        
        return data;
    }
}