function getRandomNumber(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

document.addEventListener("keydown", logKey);

function searchPosition(element) {
  const positions = new Array();
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (forest[i][j] == element) {
        positions.push([i, j]);
      }
    }
  }
  if (positions.length === 0) {
    positions.push(false);
  }
  return positions;
}

function randomCoordinates() {
  const x = getRandomNumber(0, m - 1);
  const y = getRandomNumber(0, n - 1);

  if (forest[x][y] === Free) {
    return [x, y];
  } else {
    return randomCoordinates();
  }
}

function initialiseNest() {
  const [x, y] = randomCoordinates();
  forest[x][y] = Nest;
}

function initialiseRabbit() {
  const [x, y] = randomCoordinates();
  forest[x][y] = Rabbit;
  console.log(forest);
}

function rabbitRun(a, b, x, y) {
  if (stop(a, b, Tree) === true) {
    return;
  }
  forest[x][y] = Free;
  forest[a][b] = Rabbit;
  wolfRun();
  console.log(forest);
  WinOrLose();
}

function WinOrLose() {
  if (searchPosition(Nest)[0] === false) {
    document.removeEventListener("keydown", logKey);
    console.log("You Win");
    return;
  } else if (searchPosition(Rabbit)[0] === false) {
    document.removeEventListener("keydown", logKey);
    console.log("Game Over");
    return;
  } else {
    return;
  }
}

function initialiseTree() {
  let i = null;
  while (i < percent) {
    let [x, y] = randomCoordinates();
    forest[x][y] = Tree;
    i++;
  }
}

function stop(x, y, element) {
  return forest[x][y] === element;
}

function initialiseWolf() {
  let l = null;
  while (l < percent) {
    let [x, y] = randomCoordinates();
    forest[x][y] = Wolf;
    WolfArrOld.push([x, y]);
    l++;
  }
}

function rabbitPosition() {
  return searchPosition(Rabbit)[0];
}

function distanceFormula(Wx, Wy) {
  let [Rx, Ry] = rabbitPosition();
  return Math.sqrt(Math.pow(Rx - Wx, 2) + Math.pow(Ry - Wy, 2));
}

function wolfRun() {
  for (let i = 0; i < WolfArrOld.length; i++) {
    let Wx = WolfArrOld[i][0];
    let Wy = WolfArrOld[i][1];
    let [a, b] = findeMinDistance(Wx, Wy);
    if (stop(a, b, Wolf) === true) {
      WolfArrNew[i] = [Wx, Wy];
    } else {
      WolfArrNew[i] = [a, b];
    }
  }
  fillWolfNewPosition();
}

function findeMinDistance(Wx, Wy) {
  let d1 = distanceFormula(Wx + 1, Wy);
  let d2 = distanceFormula(Wx - 1, Wy);
  let d3 = distanceFormula(Wx, Wy + 1);
  let d4 = distanceFormula(Wx, Wy - 1);

  let min = Math.min(d1, d2, d3, d4);
  if (d1 === min) {
    return [Wx + 1, Wy];
  }
  if (d2 === min) {
    return [Wx - 1, Wy];
  }
  if (d3 === min) {
    return [Wx, Wy + 1];
  }
  if (d4 === min) {
    return [Wx, Wy - 1];
  }
}

function fillWolfNewPosition() {
  for (let i = 0; i < WolfArrOld.length; i++) {
    if (forest[WolfArrNew[i][0]][WolfArrNew[i][1]] === Rabbit) {
      forest[WolfArrOld[i][0]][WolfArrOld[i][1]] = Free;
      document.removeEventListener("keydown", logKey);
      console.log("Game Over");
    } else if (forest[WolfArrNew[i][0]][WolfArrNew[i][1]] === Tree) {
      continue;
    } else {
      forest[WolfArrOld[i][0]][WolfArrOld[i][1]] = Free;
      forest[WolfArrNew[i][0]][WolfArrNew[i][1]] = Wolf;
    }
  }
  WolfArrOld = WolfArrNew;
  WolfArrNew = new Array();
}

//////////////////////////////////////////
function ArrowUp() {
  let [x, y] = searchPosition(Rabbit)[0];
  let a = x;
  let b = y;
  if (x === 0) {
    a = forest.length - 1;
  } else {
    a = x - 1;
  }
  rabbitRun(a, b, x, y);
}

function ArrowDown() {
  let [x, y] = searchPosition(Rabbit)[0];
  let a = x;
  let b = y;
  if (x === forest.length - 1) {
    a = 0;
  } else {
    a = x + 1;
  }
  rabbitRun(a, b, x, y);
}
function ArrowRight() {
  let [x, y] = searchPosition(Rabbit)[0];
  let a = x;
  let b = y;
  if (y === forest[x].length - 1) {
    b = 0;
  } else {
    b = y + 1;
  }
  rabbitRun(a, b, x, y);
}

function ArrowLeft() {
  let [x, y] = searchPosition(Rabbit)[0];
  let a = x;
  let b = y;
  if (y === 0) {
    b = forest.length - 1;
  } else {
    b = y - 1;
  }
  rabbitRun(a, b, x, y);
}

function logKey(e) {
  if (e.code === "ArrowUp") ArrowUp();
  else if (e.code === "ArrowDown") ArrowDown();
  else if (e.code === "ArrowRight") ArrowRight();
  else if (e.code === "ArrowLeft") ArrowLeft();
}

///////////////////////////////////////////////
