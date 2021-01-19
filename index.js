//const { sum } = require("mathjs");

const forest = [];

for (let i = 0; i < 10; i++) {
  forest[i] = [];
  for (let j = 0; j < 10; j++) {
    forest[i][j] = "";
  }
}
let x = getRandomNumber(0, 9);
let y = getRandomNumber(0, 9);
forest[x][y] = "R";

// function initRebbit() {
//   console.log(x, y);
//   console.log(forest[x][y]);
// }

// initRebbit();

function initWall() {
  let Xw = getRandomNumber(0, 9);
  let Yw = getRandomNumber(0, 9);

  if()
  let wall = (forest[Xw][Yw] = "W");
  //console.log(sum(range(0, (forest.length * forest.length) / 10)));
}

initWall();

console.log(forest);
