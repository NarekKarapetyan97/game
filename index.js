let m = prompt("Enter Forest Height(m)");
let n = prompt("Enter Forest Width(n)");

const forest = [];

for (let i = 0; i < m; i++) {
  forest[i] = [];
  for (let j = 0; j < n; j++) {
    forest[i][j] = "";
  }
}

let percent = (n * m) / 10;
let WolfArrOld = new Array();
let WolfArrNew = new Array();
