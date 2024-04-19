let xDrop = 0
let yDrop = 0
let iI = 0
let iJ = 0
const squareSize = 50
const matrix = []


function setup() {
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
  frameRate(40)
  
  if (matrix[iI][iJ].color == "grey") {
    matrix[iI][iJ].color = "white"
  } else {
    matrix[iI][iJ].color = "grey"
  }
  //matrix[iI][iJ].color = "grey"
  matrix[iI][iJ].iterated = true
  
  attCordinates()
  
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
  iI += upSideDown == 0 ? plusMinus : 0
  iJ += upSideDown == 1 ? plusMinus : 0
  
  if ((iI < 0 || iI > 8) || (iJ < 0 || iJ > 8)) {
    iI -= upSideDown == 0 ? plusMinus : 0
    iJ -= upSideDown == 1 ? plusMinus : 0
    attCordinates()
  }
}
