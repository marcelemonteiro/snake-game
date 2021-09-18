let canvas = document.getElementById('snake');
let startButton = document.querySelector('.startBtn');
let telaInicio = document.querySelector('.start');
let context = canvas.getContext('2d');
let box = 32;
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};
let direction = 'right';
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

function criarBG() {
  context.fillStyle = 'black';
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarGrade() {
  for (let i = 0; i < 16; i++) {
    // Linhas horizontais
    context.beginPath();
    context.moveTo(box * i + 15, 512);
    context.lineTo(box * i + 15, 0);
    context.lineWidth = 0.2;
    context.stroke();
    // Linhas verticais
    context.beginPath();
    context.moveTo(512, box * i + 15);
    context.lineTo(0, box * i + 15);
    context.lineWidth = 0.2;
    context.strokeStyle = 'green';
    context.stroke();
  }
}

function criarCobrinha() {
  for (let i = 0; i < snake.length; i++) {
    context.beginPath();
    context.arc(snake[i].x, snake[i].y, 14, 0, 2 * Math.PI);
    context.fillStyle = 'green';
    context.fill();
  }
}

function drawFood() {
  for (let i = 0; i < 2; i++) {}

  context.beginPath();
  context.arc(food.x, food.y, 5, 0, 2 * Math.PI);
  context.fillStyle = 'purple';
  context.fill();

  context.beginPath();
  context.arc(food.x + 8, food.y, 5, 0, 2 * Math.PI);
  context.fillStyle = 'purple';
  context.fill();

  context.beginPath();
  context.arc(food.x - 8, food.y, 5, 0, 2 * Math.PI);
  context.fillStyle = 'purple';
  context.fill();

  context.beginPath();
  context.arc(food.x - 4, food.y + 8, 5, 0, 2 * Math.PI);
  context.fillStyle = 'purple';
  context.fill();

  context.beginPath();
  context.arc(food.x + 4, food.y + 8, 5, 0, 2 * Math.PI);
  context.fillStyle = 'purple';
  context.fill();

  context.beginPath();
  context.arc(food.x, food.y + 16, 4, 0, 2 * Math.PI);
  context.fillStyle = 'purple';
  context.fill();

  // Folha
  context.beginPath();
  context.arc(food.x - 10, food.y - 5, 10, 5, 2 * Math.PI);
  context.fillStyle = 'green';
  context.fill();

  // Contornos
  context.beginPath();
  context.arc(food.x, food.y, 5, 0, 2 * Math.PI);
  context.strokeStyle = '#4b204b';
  context.lineWidth = 1;
  context.stroke();

  context.beginPath();
  context.arc(food.x + 8, food.y, 5, 3.5, 3 * Math.PI);
  context.strokeStyle = '#4b204b';
  context.lineWidth = 1;
  context.stroke();

  context.beginPath();
  context.arc(food.x - 8, food.y, 5, 3.5, 2 * Math.PI);
  context.strokeStyle = '#4b204b';
  context.lineWidth = 1;
  context.stroke();

  context.beginPath();
  context.arc(food.x - 4, food.y + 8, 5, 0, 2 * Math.PI);
  context.strokeStyle = '#4b204b';
  context.lineWidth = 1;
  context.stroke();

  context.beginPath();
  context.arc(food.x + 4, food.y + 8, 5, 0, 2 * Math.PI);
  context.strokeStyle = '#4b204b';
  context.lineWidth = 1;
  context.stroke();

  context.beginPath();
  context.arc(food.x, food.y + 16, 4, 0, 2 * Math.PI);
  context.strokeStyle = '#4b204b';
  context.lineWidth = 1;
  context.stroke();

  context.beginPath();
  context.arc(food.x - 10, food.y - 5, 10, 5, 2 * Math.PI);
  context.strokeStyle = '#143d17';
  context.lineWidth = 2;
  context.stroke();
}

document.addEventListener('keydown', update);

function update(event) {
  if (event.keyCode == 37 && direction != 'right') direction = 'left';
  if (event.keyCode == 38 && direction != 'down') direction = 'up';
  if (event.keyCode == 39 && direction != 'left') direction = 'right';
  if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo() {
  if (snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;
  if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;
  if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(jogo);
      alert('GAME OVER :(');
    }
  }
  criarBG();
  criarGrade();
  criarCobrinha();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == 'right') snakeX += box;
  if (direction == 'left') snakeX -= box;
  if (direction == 'up') snakeY -= box;
  if (direction == 'down') snakeY += box;

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 120);

startButton.addEventListener('click', () => {
  startButton.style.display = 'none';
  telaInicio.style.display = 'none';
});
