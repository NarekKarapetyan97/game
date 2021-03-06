function getRandomNumber(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

document.addEventListener("keydown", logKey);

///////////////////////////////////////////////
function initRebbit() {
  x = getRandomNumber(0, 9);
  y = getRandomNumber(0, 9);
  forest[x][y] = "R";
  console.log(forest);
}

function initTree() {
  for (let i = 0; i < percent; i++) {
    let Wx = getRandomNumber(0, 9);
    let Wy = getRandomNumber(0, 9);
    if (forest[Wx][Wy] === "") forest[Wx][Wy] = "T";
    else i = i - 1;
  }
}

function initWolf() {
  for (let i = 0; i < percent; i++) {
    let Fx = getRandomNumber(0, 9);
    let Fy = getRandomNumber(0, 9);
    if (forest[Fx][Fy] === "") {
      WolfArrOld.push([Fx, Fy]);
      forest[Fx][Fy] = "W";
    } else i = i - 1;
  }
}

function initNest() {
  let Nx = getRandomNumber(0, 9);
  let Ny = getRandomNumber(0, 9);
  if (forest[Nx][Ny] === "") {
    forest[Nx][Ny] = "()";
    return;
  } else {
    initNest();
  }
}

///////////////////////////////////////////////
function checkFieldForRabbit(x, y) {
  if (forest[x][y] === "T") {
    return;
  } else if (forest[x][y] === "()") {
    console.log("You Win");
    document.removeEventListener("keydown", logKey);
  } else if (forest[x][y] === "W") {
    console.log("Game Over");
    document.removeEventListener("keydown", logKey);
  } else {
    rebbitRun(x, y);
  }
}

///////////////////////////////////////////////
function rebbitRun(a, b) {
  forest[x][y] = "";
  forest[a][b] = "R";
  x = a;
  y = b;
  WolfRun(a, b);

  console.log(forest);
}

function shortestDistance(Rx, Ry, Fx, Fy) {
  let d1 = Math.sqrt(Math.pow(Rx - (Fx + 1), 2) + Math.pow(Ry - Fy, 2));
  let d2 = Math.sqrt(Math.pow(Rx - (Fx - 1), 2) + Math.pow(Ry - Fy, 2));
  let d3 = Math.sqrt(Math.pow(Rx - Fx, 2) + Math.pow(Ry - (Fy + 1), 2));
  let d4 = Math.sqrt(Math.pow(Rx - Fx, 2) + Math.pow(Ry - (Fy - 1), 2));
  let min = Math.min(d1, d2, d3, d4);
  if (d1 === min) {
    return [Fx + 1, Fy];
  }
  if (d2 === min) {
    return [Fx - 1, Fy];
  }
  if (d3 === min) {
    return [Fx, Fy + 1];
  }
  if (d4 === min) {
    return [Fx, Fy - 1];
  }
}

function fillWolfNewPosition() {
  for (let i = 0; i < WolfArrOld.length; i++) {
    if (
      forest[WolfArrNew[i][0]][WolfArrNew[i][1]] === "T" ||
      forest[WolfArrNew[i][0]][WolfArrNew[i][1]] === "W" ||
      forest[WolfArrNew[i][0]][WolfArrNew[i][1]] === "()"
    ) {
      continue;
    } else if (forest[WolfArrNew[i][0]][WolfArrNew[i][1]] === "R") {
      forest[WolfArrOld[i][0]][WolfArrOld[i][1]] = "";
      document.removeEventListener("keydown", logKey);
      console.log("Game Over");
    } else {
      forest[WolfArrOld[i][0]][WolfArrOld[i][1]] = "";
      forest[WolfArrNew[i][0]][WolfArrNew[i][1]] = "W";
    }
  }
  WolfArrOld = WolfArrNew;
  WolfArrNew = new Array();
}

function WolfRun(Rx, Ry) {
  for (let i = 0; i < WolfArrOld.length; i++) {
    let Fx = WolfArrOld[i][0];
    let Fy = WolfArrOld[i][1];
    let newCordinate = shortestDistance(Rx, Ry, Fx, Fy);
    WolfArrNew[i] = newCordinate;
  }
  fillWolfNewPosition();
}

function ArrowUp() {
  if (x === 0) {
    a = forest.length - 1;
  } else {
    a = x - 1;
  }
  checkFieldForRabbit(a, y);
}

function ArrowDown() {
  if (x === forest.length - 1) {
    a = 0;
  } else {
    a = x + 1;
  }
  checkFieldForRabbit(a, y);
}
function ArrowRight() {
  if (y === forest[x].length - 1) {
    b = 0;
  } else {
    b = y + 1;
  }
  checkFieldForRabbit(x, b);
}

function ArrowLeft() {
  if (y === 0) {
    b = forest.length - 1;
  } else {
    b = y - 1;
  }
  checkFieldForRabbit(x, b);
}

function logKey(e) {
  if (e.code === "ArrowUp") ArrowUp();
  else if (e.code === "ArrowDown") ArrowDown();
  else if (e.code === "ArrowRight") ArrowRight();
  else if (e.code === "ArrowLeft") ArrowLeft();
}

///////////////////////////////////////////////
