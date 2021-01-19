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

for (let wall = 0; wall < (forest.length * forest.length) / 10; wall++) {
  return fox;
}
console.log(fox);

console.log(forest);
