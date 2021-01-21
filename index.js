let m = prompt("Enter Forest Height(m)");
let n = prompt("Enter Forest Width(n)");

const forest = [];

for (let i = 0; i < m; i++) {
  forest[i] = [];
  for (let j = 0; j < n; j++) {
    forest[i][j] = "";
  }
}

let i = null;
let j = null;

// const randomX = getRandomNumber(0, m);
//const randomY = getRandomNumber(0, n);

let percent = (forest.length * forest.length) / 10;
let WolfArrOld = new Array();
let WolfArrNew = new Array();
