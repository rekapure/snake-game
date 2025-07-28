// Get the canvas element and its drawing context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set the size of each grid cell and calculate the number of tiles
const gridSize = 20;
const tileCount = canvas.width / gridSize;

// Initialize the snake as an array of segments (starting with one segment)
let snake = [{ x: 10, y: 10 }];

// Direction the snake is moving (x, y)
let direction = { x: 0, y: 0 };

// Food position
let food = { x: 5, y: 5 };

// Game over flag
let gameOver = false;

// Draw everything on the canvas
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  ctx.fillStyle = 'lime';
  snake.forEach(segment => {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });

  // Draw the food
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

  // If the game is over, display a message
  if (gameOver) {
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText('Game Over', 110, 200);
  }
}

// Update the game state (move snake, check collisions, etc.)
function update() {
  if (gameOver) return;

  // Calculate new head position based on direction
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Check collision with walls
  if (
    head.x < 0 || head.x >= tileCount ||
    head.y < 0 || head.y >= tileCount
  ) {
    gameOver = true;
    return;
  }

  // Check collision with self
  if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    gameOver = true;
    return;
  }

  // Add new head to the snake
  snake.unshift(head);

  // Check if the snake has eaten the food
  if (head.x === food.x && head.y === food.y) {
    placeFood(); // Place new food
  } else {
    snake.pop(); // Remove the tail segment if no food eaten
  }
}

// Place food at a random position not occupied by the snake
function placeFood() {
  food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  };
  // If food is on the snake, place it again
  if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
    placeFood();
  }
}

// Listen for arrow key presses to change direction
document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      if (direction.y === 1) break; // Prevent reversing
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

// Main game loop: update and draw repeatedly
function gameLoop() {
  update();
  draw();
  setTimeout(gameLoop, 100); // Run every 100ms
}

// Initial draw and start the game