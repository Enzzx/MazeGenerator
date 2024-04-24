let xDrop = 0
let yDrop = 0
let iI = 0
let iJ = 0
const squareSize = 50
const matrix = []
const stack = []
let cache = []

function setup() {
  frameRate(1)
  
  createCanvas(450, 450);
  background(0);
  iI = int(random(9))
  iJ = int(random(9))
  
  for (let i = 0; i < 9; i++) {
    const coluna = []
    matrix.push(coluna)
    for (let j = 0; j < 9; j++) {
      const celula = new cell(xDrop, yDrop, i, j)
      //rect(xDrop, yDrop, squareSize, squareSize)
      coluna.push(celula)
      xDrop+=50
    }
    xDrop = 0
    yDrop+=50
  }
  
  matrix[iI][iJ].color = "white"
  matrix[iI][iJ].iterated = true
  iI = int(random(9))
  iJ = int(random(9))
  
  matrix.forEach(coluna => {
    coluna.forEach(cell => {
      cell.paint()
      cell.walls()
    })
  })
}


function draw() {
  attCordinates()
  /*
  if (matrix[iI][iJ].color == "grey") {
    matrix[iI][iJ].color = "white"
  } else {
    matrix[iI][iJ].color = "grey"
  }*/
  matrix[iI][iJ].color = "grey"
  matrix[iI][iJ].iterated = true
  
  matrix.forEach(coluna => {
    coluna.forEach(cell => {
      cell.paint()
      cell.walls()
    })
  })
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
    text(`${this.i}, ${this.j}`, this.x, this.y)
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

  if ((iI < 0 || iI > 8) || (iJ < 0 || iJ > 8)) {
    iI = oldCoords[0]
    iJ = oldCoords[1]
    return attCordinates()
  } else {
    if (upSideDown == 0 && plusMinus == -1) {
      //left
      matrix[oldCoords[0]][oldCoords[1]].leftW = false
      matrix[iI][iJ].rightW = false
    } else if (upSideDown == 0 && plusMinus == 1) {
      //right
      matrix[oldCoords[0]][oldCoords[1]].rightW = false
      matrix[iI][iJ].leftW = false
    } else if (upSideDown == 1 && plusMinus == -1) {
      //top
      matrix[oldCoords[0]][oldCoords[1]].topW = false
      matrix[iI][iJ].bottomW = false
    } else {
      //bottom
      matrix[oldCoords[0]][oldCoords[1]].bottomW = false
      matrix[iI][iJ].topW = false
    }
    cache.push(Array.of(iI, iJ))
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
