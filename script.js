let finished = false
let xDrop = 0
let yDrop = 0
let iI = 0
let iJ = 0
const perimeter = 20
const squareSize = 450/perimeter
const matrix = []
const stack = []
let cache = []
let direction = []

function setup() {
  //frameRate(1)
  
  createCanvas(450, 450);
  background(0);

  for (let i = 0; i < perimeter; i++) {
    const coluna = []
    matrix.push(coluna)
    for (let j = 0; j < perimeter; j++) {
      const celula = new cell(xDrop, yDrop, i, j)
      //rect(xDrop, yDrop, squareSize, squareSize)
      coluna.push(celula)
      xDrop+=squareSize
    }
    xDrop = 0
    yDrop+=squareSize;
  }
  
  [iI, iJ] = randomize();
  matrix[iI][iJ].color = "white"
  matrix[iI][iJ].iterated = true;

  [iI, iJ] = randomize();
  matrix[iI][iJ].color = "grey"
  cache.push([iI, iJ])
  
  matrix.forEach(coluna => {
    coluna.forEach(cell => {
      cell.paint()
      cell.walls()
    })
  })
}


function draw() {
  if (!finished) {
    if (cache.length == 0) {
      [iI, iJ] = randomize()
      direction = []
    }
    attCordinates()
    
    matrix[iI][iJ].color = "grey"
    
    if (matrix[iI][iJ].iterated == true) {
      cache.forEach(subarray => {
        matrix[subarray[0]][subarray[1]].iterated = true
        matrix[subarray[0]][subarray[1]].color = "white"
      })
      cache.length = 0
    }
    
    matrix.forEach(coluna => {
      coluna.forEach(cell => {
        cell.paint()
        cell.walls()
      })
    })
    
  } else {
    
  }
}


class cell {
  constructor(x, y, i, j) {
    this.x = x
    this.y = y
    this.i = i
    this.j = j
    this.color = "black"
    this.iterated = false
    this.topW = true
    this.bottomW = true
    this.rightW = true
    this.leftW = true
  }
  
  paint() {
    noStroke()
    fill(this.color)
    rect(this.x, this.y, squareSize, squareSize)
    //text(`${this.i}, ${this.j}`, this.x, this.y)
  }
  
  walls() {
    stroke(0)
    
    if (this.topW) {
      line(this.x, this.y, this.x+squareSize, this.y)
    }
    if (this.rightW) {
      line(this.x+squareSize, this.y, this.x+squareSize, this.y+squareSize)
    }
    if (this.bottomW) {
      line(this.x, this.y+squareSize, this.x+squareSize, this.y+squareSize)
    }
    if (this.leftW) {
      line(this.x, this.y, this.x, this.y+squareSize)
    }
  }
}


function attCordinates() {
  //console.log(direction)
  
  const upSideDown = random([0, 1])
  const plusMinus = random([-1, 1])
  const oldCoords = [iI, iJ]
  
  nextCoords = [iI + (upSideDown == 0 ? plusMinus : 0), iJ + (upSideDown == 1 ? plusMinus : 0)]
  iI = nextCoords[0]
  iJ = nextCoords[1]
  if (matchArray(cache, nextCoords)) {
    //nextCoords = [iI - (upSideDown == 0 ? plusMinus : 0), iJ - (upSideDown == 1 ? plusMinus : 0)]
    const index = findI(cache, nextCoords)
    const lixeira = cache.slice(index+1)
    cache = cache.slice(0, index+1)
    //console.log(cache, lixeira)
    lixeira.forEach(lixo => {
      matrix[lixo[0]][lixo[1]].color = "black"
      matrix[lixo[0]][lixo[1]].topW = true
      matrix[lixo[0]][lixo[1]].bottomW = true
      matrix[lixo[0]][lixo[1]].leftW = true
      matrix[lixo[0]][lixo[1]].rightW = true
    })
    return
  }
    
    // if (direction[direction.length-1] == "t" && upSideDown == 0 && plusMinus == 1) {
    //   console.log("voltou pro de baixo")
    // } else if (direction == "b" && upSideDown == 0 && plusMinus == -1) {
    //   console.log("voltou pro de cima")
    // } else if (direction == "l" && upSideDown == 1 && plusMinus == 1) {
    //   console.log("voltou pra direita")
    // } else if (direction == "r" && upSideDown == 1 && plusMinus == -1) {
    //   console.log("voltou pra esquerda")
    // }

  if ((iI < 0 || iI > perimeter-1) || (iJ < 0 || iJ > perimeter-1)) {
    console.log("entrou")
    iI = oldCoords[0]
    iJ = oldCoords[1]
    return attCordinates()
  } else {
    /*if (!matchArray(cache, [iI, iJ])) {
      cache.push([iI, iJ])
    }*/
    
    if (upSideDown == 0 && plusMinus == -1) {
      //top
      matrix[oldCoords[0]][oldCoords[1]].topW = false
      matrix[iI][iJ].bottomW = false
      //direction.push("t")
    } else if (upSideDown == 0 && plusMinus == 1) {
      //bottom
      matrix[oldCoords[0]][oldCoords[1]].bottomW = false
      matrix[iI][iJ].topW = false
      //direction.push("b")
    } else if (upSideDown == 1 && plusMinus == -1) {
      //left
      matrix[oldCoords[0]][oldCoords[1]].leftW = false
      matrix[iI][iJ].rightW = false
      //direction.push("l")
    } else {
      //right
      matrix[oldCoords[0]][oldCoords[1]].rightW = false
      matrix[iI][iJ].leftW = false
      //direction.push("r")
    }
    cache.push([iI, iJ])
  }
}
  
function findI(matrix, uni) {
  for (let i = 0; i < matrix.length; i++) {
    if (matchArray(Array.of(matrix[i]), uni)) {
      return i
    }
  }
}

function matchArray(bid, uni) {
  return bid.some(subarray => {
    return subarray.every((valor, index) => valor === uni[index])
  })
}
  
function randomize() {
  let [a, b] = [int(random(perimeter)), int(random(perimeter))]
  if (matrix[a][b].iterated) {
    return randomize()
  } else {
    return [a, b];
  }
}
