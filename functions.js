const Rabbit = "R";
const Wolf = "W";
const Tree = "T";
const Nest = "(nests)";
const Free = "";
function getRandomNumber(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

document.addEventListener("keydown", logKey);

function searchPositions(element) {
  const positions = new Array();
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (forest[i][j] == element) {
        positions.push([i, j]);
      }
    }
  }

  return positions;
}

function getRndFreeCoordinat() {
  const x = getRandomNumber(0, m - 1);
  const y = getRandomNumber(0, n - 1);

  return forest[x][y] === Free ? [x, y] : getRndFreeCoordinat();
}

const drawBoard = () => {
  console.log(forest);
};

const initObjectAtRndPosition = (ID) => () => {
  const [x, y] = getRndFreeCoordinat();
  forest[x][y] = ID;
  return [x, y];
};

const initialiseNest = initObjectAtRndPosition(Nest);
const initialiseRabbit = initObjectAtRndPosition(Rabbit);
const initialiseTree = initObjectAtRndPosition(Tree);
const initialiseWolf = initObjectAtRndPosition(Wolf);

const doNTimes = (N) => (fn) => {
  let i = null;
  const results = [];
  while (i < N) {
    results.push(fn());
    i++;
  }
  return results;
};

function initialiseTrees() {
  console.log(forest);
  doNTimes(percent)(initialiseTree);
}

function initialiseWolfs() {
  WolfArrOld = doNTimes(percent)(initialiseWolf);
}

function rabbitRun(a, b, x, y) {
  if (elementExists(a, b, Tree)) {
    return [a, b, x, y];
  }
  forest[x][y] = Free;
  forest[a][b] = Rabbit;
  return [a, b, x, y];
}

function elementExists(x, y, element) {
  return forest[x][y] === element;
}

function WinOrLose() {
  if (searchPositions(Nest).length === 0) {
    document.removeEventListener("keydown", logKey);
    console.log("You Win");
    return;
  } else if (searchPositions(Rabbit).length === 0) {
    document.removeEventListener("keydown", logKey);
    console.log("Game Over");
    return;
  } else {
    return;
  }
}

function rabbitPosition() {
  return searchPositions(Rabbit)[0];
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
    if (elementExists(a, b, Wolf)) {
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
    } else if (forest[WolfArrNew[i][0]][WolfArrNew[i][1]] === Nest) {
      return;
    } else {
      forest[WolfArrOld[i][0]][WolfArrOld[i][1]] = Free;
      forest[WolfArrNew[i][0]][WolfArrNew[i][1]] = Wolf;
    }
  }
  WolfArrOld = WolfArrNew;
  WolfArrNew = new Array();
}

//////////////////////////////////////////

function ArrowDown(a, b, x, y) {
  if (x === forest.length - 1) {
    a = 0;
  } else {
    a = x + 1;
  }
  return [a, b, x, y];
}
function ArrowRight(a, b, x, y) {
  if (y === forest[x].length - 1) {
    b = 0;
  } else {
    b = y + 1;
  }
  return [a, b, x, y];
}

function ArrowLeft(a, b, x, y) {
  if (y === 0) {
    b = forest.length - 1;
  } else {
    b = y - 1;
  }
  return [a, b, x, y];
}

function ArrowUp(a, b, x, y) {
  if (x === 0) {
    a = forest.length - 1;
  } else {
    a = x - 1;
  }
  console.log([x, a]);
  return [a, b, x, y];
}

function logKey(e) {
  let [x, y] = searchPositions(Rabbit)[0];
  let a = x;
  let b = y;
  let result;

  if (e.code === "ArrowUp") {
    result = ArrowUp(a, b, x, y);
  } else if (e.code === "ArrowDown") {
    result = ArrowDown(a, b, x, y);
  } else if (e.code === "ArrowRight") {
    result = ArrowRight(a, b, x, y);
  } else if (e.code === "ArrowLeft") {
    result = ArrowLeft(a, b, x, y);
  }
  rabbitRun(...result);
  drawBoard();
  wolfRun();
  WinOrLose();
}

///////////////////////////////////////////////
