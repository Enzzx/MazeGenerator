const widt = 500
const xQ = 22
const heigt = 300
const yQ = (heigt/widt)*xQ

let xDrop = 0
let yDrop = 0
const matrix = []
const snake = [[0, 0], [1, 0], [2, 0], [3, 0]]
let walk = [1, 0]
let lastWalk = []
let apple = []

function setup() {
  frameRate(6)
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
  
  apple = newApple()
  matrix[apple[0]][apple[1]].color = "rgb(233,42,42)"
}

function draw() {
  //if (walk[0] == )
  snake.forEach(bodyPart => {
    matrix[bodyPart[0]][bodyPart[1]].color = "darkgreen"
  })
  
  matrix.forEach(column => {
    column.forEach(cell => {
      cell.paint()
    })
  })
  
  let body = [...snake[snake.length-1]]
  body[0] += walk[0]
  body[1] += walk[1]
  snake.push(body)
  
  if (matchArray([body], apple)) {
    apple = newApple()
    matrix[apple[0]][apple[1]].color = "rgb(233,42,42)"
  } else {
    matrix[snake[0][0]][snake[0][1]].color = "black"
    snake.shift()
  }
  
  lastWalk = walk
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    walk = [0, -1]
  }
  if (keyCode == DOWN_ARROW) {
    walk = [0, 1]
  }
  if (keyCode == RIGHT_ARROW) {
    walk = [1, 0]
  }
  if (keyCode == LEFT_ARROW) {
    walk = [-1, 0]
  }
}

class cell {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.color = "black"
  }
  
  paint() {
    //stroke("red")
    fill(this.color)
    rect(this.x, this.y, widt/xQ, heigt/int(yQ))
  }
}

function newApple() {
  let position =  [int(random(xQ)), int(random(yQ))]
  if (matchArray(snake, position)) {
    return newApple() 
  } else {
    return position
  }
}

function matchArray(bid, uni) {
  return bid.some(subarray => {
    return subarray.every((valor, index) => valor === uni[index])
  })
}
