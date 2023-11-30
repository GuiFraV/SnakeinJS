const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const snakeSize = 10;
let snake = [{x: 200, y: 200}];
let dx = snakeSize;
let dy = 0;
let apple = getRandomApplePosition();
let gameRunning = true;

function drawSnakePart(snakePart) {
    ctx.fillStyle = 'green';
    ctx.fillRect(snakePart.x, snakePart.y, snakeSize, snakeSize);
}

function drawSnake() {
    snake.forEach(drawSnakePart);
}

function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    if (head.x === apple.x && head.y === apple.y) {
        apple = getRandomApplePosition();
    } else {
        snake.pop();
    }
}

function drawApple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, snakeSize, snakeSize);
}

function getRandomApplePosition() {
    let appleX = Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize;
    let appleY = Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize;
    return {x: appleX, y: appleY};
}

function changeDirection(event) {
    const keyPressed = event.key;
    const goingUp = dy === -snakeSize;
    const goingDown = dy === snakeSize;
    const goingRight = dx === snakeSize;
    const goingLeft = dx === -snakeSize;

    if (keyPressed === 'ArrowUp' && !goingDown) {
        dx = 0;
        dy = -snakeSize;
    } else if (keyPressed === 'ArrowDown' && !goingUp) {
        dx = 0;
        dy = snakeSize;
    } else if (keyPressed === 'ArrowLeft' && !goingRight) {
        dx = -snakeSize;
        dy = 0;
    } else if (keyPressed === 'ArrowRight' && !goingLeft) {
        dx = snakeSize;
        dy = 0;
    }
}

function didGameEnd() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }
    return false;
}

function gameLoop() {
    if (didGameEnd()) {
        gameRunning = false;
        ctx.font = "30px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Game Over", canvas.width / 4, canvas.height / 2);
        return;
    }

    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawApple();
        moveSnake();
        drawSnake();
        gameLoop();
    }, 100);
}

document.addEventListener('keydown', changeDirection);
gameLoop();
