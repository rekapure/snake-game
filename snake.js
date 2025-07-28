window.onload = function() {
  // Get the canvas element and its drawing context
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  // Set the size of each grid cell and calculate the number of tiles
  const gridSize = 20;
  const tileCount = canvas.width / gridSize;

  // Initialize the snake as an array of segments (starting with one segment)
  let snake = [{ x: 10, y: 10 }];

  let direction = { x: 1, y: 0 }; // Start moving to the right

  // Food position
  let food = { x: 5, y: 5 };

  // Game over flag
  let gameOver = false;

  // Draw everything on the canvas
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'lime';
    snake.forEach(segment => {
      ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    if (gameOver) {
      ctx.fillStyle = 'white';
      ctx.font = '30px Arial';
      ctx.fillText('Game Over', 110, 200);
    }
  }

  function update() {
    if (gameOver) return;
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    if (
      head.x < 0 || head.x >= tileCount ||
      head.y < 0 || head.y >= tileCount
    ) {
      gameOver = true;
      return;
    }
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      gameOver = true;
      return;
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      placeFood();
    } else {
      snake.pop();
    }
  }

  function placeFood() {
    food = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
    if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
      placeFood();
    }
  }

  document.addEventListener('keydown', e => {
    switch (e.key) {
      case 'ArrowUp':
        if (direction.y === 1) break;
        direction = { x: 0, y: -1 };
        break;
      case 'ArrowDown':
        if (direction.y === -1) break;
        direction = { x: 0, y: 1 };
        break;
      case 'ArrowLeft':
        if (direction.x === 1) break;
        direction = { x: -1, y: 0 };
        break;
      case 'ArrowRight':
        if (direction.x === -1) break;
        direction = { x: 1, y: 0 };
        break;
    }
  });

  function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100);
  }

  draw();
  gameLoop();
};