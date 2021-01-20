const forest = [];

for (let i = 0; i < 10; i++) {
  forest[i] = [];
  for (let j = 0; j < 10; j++) {
    forest[i][j] = "";
  }
}
let x = null;
let y = null;
let percent = (forest.length * forest.length) / 10;
let WolfArrOld = new Array();
let WolfArrNew = new Array();
