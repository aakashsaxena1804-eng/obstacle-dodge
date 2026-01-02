const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreEl = document.getElementById("score");

let jumping = false;
let playerBottom = 0;
let score = 0;
let speed = 4;
let gameOver = false;


document.addEventListener("keydown", function (e) {
  if (e.code === "Space" && !jumping && !gameOver) {
    jumping = true;

    let up = setInterval(() => {
      if (playerBottom >= 120) {
        clearInterval(up);

        let down = setInterval(() => {
          if (playerBottom <= 0) {
            clearInterval(down);
            jumping = false;
            playerBottom = 0;
          }
          playerBottom -= 6;
          player.style.bottom = playerBottom + "px";
        }, 20);
      }

      playerBottom += 18;
      player.style.bottom = playerBottom + "px";
    }, 20);
  }
});

function createObstacle() {
  if (gameOver) return;

  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  game.appendChild(obstacle);

  let obstacleLeft = 600;
  obstacle.style.left = obstacleLeft + "px";

  const move = setInterval(() => {
    if (gameOver) {
      clearInterval(move);
      return;
    }

    obstacleLeft -= speed;
    obstacle.style.left = obstacleLeft + "px";

    // Collision
    if (
      obstacleLeft < 90 &&
      obstacleLeft > 40 &&
      playerBottom < 25
    ) {
      gameOver = true;
      alert("Game Over 😢  Score: " + score);
      location.reload();
    }

    // Passed obstacle
    if (obstacleLeft < -20) {
      clearInterval(move);
      game.removeChild(obstacle);
      score++;
      scoreEl.innerText = "Score: " + score;

      if (score % 5 === 0 && speed < 10) {
        speed += 0.5;
      }
    }
  }, 20);

  setTimeout(createObstacle, 1800);
}

createObstacle();
