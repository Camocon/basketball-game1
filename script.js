// Get the canvas and context for drawing
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game variables
let gameStarted = false;
let score = 0;
let ball = {
  x: 50,
  y: 300,
  radius: 15,
  color: "orange",
  speedX: 0,
  speedY: 0,
};

const hoop = { x: 600, y: 150, width: 100, height: 10 };

// Function to reset the game
function resetGame() {
  ball.x = 50;
  ball.y = 300;
  ball.speedX = 0;
  ball.speedY = 0;
  score = 0;
  document.getElementById('scoreText').innerText = `Score: ${score}`;
}

// Function to start the game
document.getElementById('startButton').addEventListener('click', function () {
  gameStarted = true;
  document.getElementById('startButton').style.display = 'none';
  resetGame();
  drawGame();
});

// Function to draw the game objects
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the hoop
  ctx.fillStyle = "red";
  ctx.fillRect(hoop.x, hoop.y, hoop.width, hoop.height);

  // Draw the ball
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();

  // Apply gravity to the ball
  if (ball.y + ball.radius < canvas.height) {
    ball.speedY += 0.5; // Gravity force
  } else {
    ball.speedY = -ball.speedY * 0.6; // Ball bounce effect
  }

  // Update the ball's position
  ball.x += ball.speedX;
  ball.y += ball.speedY;

  // Check for basket score
  if (
    ball.x + ball.radius > hoop.x &&
    ball.x - ball.radius < hoop.x + hoop.width &&
    ball.y - ball.radius < hoop.y + hoop.height
  ) {
    score += 1;
    document.getElementById('scoreText').innerText = `Score: ${score}`;
    resetGame(); // Reset the game after scoring
  }

  // Continue the game loop if the game is started
  if (gameStarted) {
    requestAnimationFrame(drawGame);
  }
}

// Handle mouse click to shoot the ball
canvas.addEventListener("click", function (event) {
  if (gameStarted) {
    const offsetX = canvas.getBoundingClientRect().left;
    const offsetY = canvas.getBoundingClientRect().top;
    const mouseX = event.clientX - offsetX;
    const mouseY = event.clientY - offsetY;

    // Launch the ball toward the clicked position
    ball.speedX = (mouseX - ball.x) / 15;
    ball.speedY = (mouseY - ball.y) / 15;
  }
});
