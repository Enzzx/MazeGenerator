const widt = 500
const xQ = 15
const heigt = 350
const yQ = (350/500)*xQ

let xDrop = 0
let yDrop = 0
const matrix = []
const snake = [[0, 0]]

function setup() {
  createCanvas(widt, heigt);
  background(220);
  
  for (let i = 0; i < xQ; i++) {
    const coluna = []
    matrix.push(coluna)
    for (let j = 0; j < int(yQ); j++) {
      const celula = new cell(xDrop, yDrop)
      coluna.push(celula)
      yDrop += heigt/int(yQ)
    }
    xDrop += widt/xQ
    yDrop = 0
  }
}

function draw() {
  snake.forEach(bodyPart => {
    matrix[bodyPart[0]][bodyPart[1]].color = "darkgreen"
  })
  
  matrix.forEach(column => {
    column.forEach(cell => {
      cell.paint()
    })
  })
}

class cell {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.color = "black"
  }
  
  paint() {
    stroke("red")
    fill(this.color)
    rect(this.x, this.y, widt/xQ, heigt/int(yQ))
  }
}
