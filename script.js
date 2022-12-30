let canvas = document.getElementById('snake')
let context = canvas.getContext('2d')
let box = 32
let snake = []
let ponto = 0
let speed = 500
let level = 1

snake[0] = {
  x: 8 * box,
  y: 8 * box
}

let direction = 'right'
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
  context.fillStyle = 'lightgreen'
  context.fillRect(0, 0, 16 * box, 16 * box)
}

function criarCobrinha() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = 'green'
    context.fillRect(snake[i].x, snake[i].y, box, box)
  }
}

function drawfood() {
  context.fillStyle = 'red'
  context.fillRect(food.x, food.y, box, box)
}

document.addEventListener('keydown', update)

function update(event) {
  if (event.keyCode == 37 && direction != 'right') direction = 'left'
  if (event.keyCode == 38 && direction != 'down') direction = 'up'
  if (event.keyCode == 39 && direction != 'left') direction = 'right'
  if (event.keyCode == 40 && direction != 'up') direction = 'down'
}
/*
function velocidade() {
  if (ponto % 50) {
    speed - 200
    document.getElementById('level').innerHTML = ++level
  }
}*/

function iniciaJogo() {
  criarBG()
  criarCobrinha()
  drawfood()

  if (snake[0].x >= 16 * box && direction == 'right') snake[0].x = -32
  if (snake[0].x <= -32 && direction == 'left') snake[0].x = 16 * box
  if (snake[0].y >= 16 * box && direction == 'down') snake[0].y = -32
  if (snake[0].y <= -32 && direction == 'up') snake[0].y = 16 * box

  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(start())
      speed = 0
      alert('jogo acabou')
    }
  }

  let snakeX = snake[0].x
  let snakeY = snake[0].y

  if (direction == 'right') snakeX += box
  if (direction == 'left') snakeX -= box
  if (direction == 'up') snakeY -= box
  if (direction == 'down') snakeY += box

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop()
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box
    food.y = Math.floor(Math.random() * 15 + 1) * box

    document.getElementById('score').innerHTML = ponto += 10
    // velocidade()
    if (!(ponto % 40)) {
      speed -= 100
      document.getElementById('level').innerHTML = ++level
      clearInterval(start())
    }
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  }
  snake.unshift(newHead)
}

let start = () => {
  setInterval(iniciaJogo, speed)
}

start()
