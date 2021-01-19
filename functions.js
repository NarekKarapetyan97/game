function getRandomNumber(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

document.addEventListener("keydown", logKey);

function rebbitRun(a, b) {
  forest[x][y] = "";
  forest[a][b] = "R";
  x = a;
  y = b;
  console.log(forest);
}

function ArrowUp() {
  if (x === 0) {
    a = forest.length - 1;
  } else {
    a = x - 1;
  }
  rebbitRun(a, y);
}

function ArrowDown() {
  if (x === forest.length - 1) {
    a = 0;
  } else {
    a = x + 1;
  }
  rebbitRun(a, y);
}
function ArrowRight() {
  if (y === forest[x].length - 1) {
    b = 0;
  } else {
    b = y + 1;
  }
  rebbitRun(x, b);
}
function ArrowLeft() {
  if (y === 0) {
    b = forest.length - 1;
  } else {
    b = y - 1;
  }
  rebbitRun(x, b);
}

function logKey(e) {
  if (e.code === "ArrowUp") ArrowUp();
  else if (e.code === "ArrowDown") ArrowDown();
  else if (e.code === "ArrowRight") ArrowRight();
  else if (e.code === "ArrowLeft") ArrowLeft();
}
