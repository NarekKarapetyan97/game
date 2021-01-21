function getRandomNumber(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

document.addEventListener("keydown", logKey);

const Rabbit = "R";
const Wolf = "W";
const Tree = "T";
const Nest = "(nests)";
const Free = "";

///////////////////////////////////////////////

// function randomCoordinateX(Rx) {
//   Rx = getRandomNumber(0, m);
//   return Rx;
// }
// function randomCoordinateY(Ry) {
//   Ry = getRandomNumber(0, n);
//   return Ry;
// }

// function randomCoordinates() {
//   x = randomCoordinateX();
//   y = randomCoordinateY();
//   const obj = { x, y };
//   return obj;
// }
function randomCoordinates() {
  x = getRandomNumber(0, m);
  y = getRandomNumber(0, n);

  if (forest[x][y] === Free) {
    return [x, y];
  } else {
    return randomCoordinates();
  }
}

// function rabbitPosition(){
//     const freeCell = randomCoordinates();
//   const coordtinateX = forest[freeCell.x][0]
//   const coordtinateX = forest[0][freeCell.y]

// }

function initialiseRabbit() {
  const [x, y] = randomCoordinates();
  forest[x][y] = Rabbit;

  const rabbitPosition = { x, y };
  //rabbitRun(Rx, Ry);
  console.log(forest);
  return rabbitPosition;
}

function rabbitPosition() {
  const initRabbit = initialiseRabbit();
  const Rx = initRabbit.Rfx;
  const Ry = initRabbit.Rfy;
  const rabbitObjPosition = { Rx, Ry };
  rabbitRun(Rx, Ry);
  return rabbitObjPosition;
}

function rabbitRun(a, b) {
  const position = rabbitPosition();
  forest[position.Rx][position.Ry] = Free;
  forest[a][b] = Rabbit;
  position.Rx = a;
  position.Ry = b;

  //   const initRabbit = initialiseRabbit();
  //   forest[initRabbit.Rx][initRabbit.Ry] = Free;
  //   forest[a][b] = Rabbit;
  //   initRabbit.Rx = a;
  //   initRabbit.Ry = b;
  //   //   WolfRun(a, b);
  //   forest[i][j] = Free;
  //   forest[a][b] = Rabbit;
  //   i = a;
  //   j = b;

  console.log(forest);
}

function initialiseNest() {
  const freeCell = randomCoordinates();
  forest[freeCell.x][freeCell.y] = Nest;
}

// function freeCell() {
//   if (forest[i][j] === Free) {
//     randomCoordinates();
//   } else {
//     freeCell();
//   }
// }

// function initialiseRabbit() {
//   const free = freeCell();
//   forest[free.x][free.y] = Rabbit;
//   //   const rabbitCoordinates = randomCoordinates();
//   //   initRabbit(rabbitCoordinates.x, rabbitCoordinates.y);
// }

// function initRabbit(Rx, Ry) {
//   //   let rabbitCell = forest[Rx][Ry];
//   //   rabbitCell = Rabbit;
//   if (forest[Rx][Ry] === Free) {
//     forest[Rx][Ry] = Rabbit;
//   } else {
//     initialiseRabbit;
//   }
//   console.log(forest);
// }

// function initialiseNest() {
//   const nestCoordinates = randomCoordinates();
//   initNest(nestCoordinates.x, nestCoordinates.y);
// }

// function initNest(Nx, Ny) {
//   const nestCell = forest[Nx][Ny];
//   if (nestCell === Free) {
//     //nestCell = Nest;
//     //   if (forest[Nx][Ny] === Free) {
//     forest[Nx][Ny] = Nest;
//     return console.log(nestCell);
//   } else {
//     initialiseNest();
//   }
// }

// function initialiseNest() {
//     const [x, y] = randomCoordinates();

//     if (forest[x][y] === Free) {
//       forest[x][y] = Nest;
//     } else {
//       initialiseNest();
//     }
//   }

function initTree() {
  for (let i = 0; i < percent; i++) {
    let Wx = getRandomNumber(0, 9);
    let Wy = getRandomNumber(0, 9);

    if (forest[Wx][Wy] === Free) forest[Wx][Wy] = Tree;
    else i = i - 1;
  }
}

function initWolf() {
  for (let i = 0; i < percent; i++) {
    let Fx = getRandomNumber(0, 9);
    let Fy = getRandomNumber(0, 9);
    if (forest[Fx][Fy] === Free) {
      WolfArrOld.push([Fx, Fy]);
      forest[Fx][Fy] = Wolf;
    } else i = i - 1;
  }
}

///////////////////////////////////////////////
function checkFieldForRabbit(x, y) {
  if (forest[x][y] === Tree) {
    return;
  } else if (forest[x][y] === Nest) {
    console.log("You Win");
    document.removeEventListener("keydown", logKey);
  } else if (forest[x][y] === Wolf) {
    console.log("Game Over");
    document.removeEventListener("keydown", logKey);
  } else {
    rabbitRun(x, y);
  }
}

///////////////////////////////////////////////

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
      forest[WolfArrNew[i][0]][WolfArrNew[i][1]] === Tree ||
      forest[WolfArrNew[i][0]][WolfArrNew[i][1]] === Wolf ||
      forest[WolfArrNew[i][0]][WolfArrNew[i][1]] === Nest
    ) {
      continue;
    } else if (forest[WolfArrNew[i][0]][WolfArrNew[i][1]] === Rabbit) {
      forest[WolfArrOld[i][0]][WolfArrOld[i][1]] = Free;
      document.removeEventListener("keydown", logKey);
      console.log("Game Over");
    } else {
      forest[WolfArrOld[i][0]][WolfArrOld[i][1]] = Free;
      forest[WolfArrNew[i][0]][WolfArrNew[i][1]] = Wolf;
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
