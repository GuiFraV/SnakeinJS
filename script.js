const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const height = canvas.height/2;
const width = canvas.width/2;

console.log(width, height)


// Create the snake:
let snake = [
    {x: 150, y: 75},
    {x: 140, y: 75},
    {x: 130, y: 75},
    {x: 120, y: 75},
    {x: 110, y: 75},
]

function drawSnakePart(snakeParts){
    ctx.fillStyle="green";
    ctx.strokeStyle ="red";
    ctx.strokeRect(snakeParts.x, snakeParts.y, 10, 5);
    ctx.fillRect(snakeParts.x, snakeParts.y, 10, 5);
}

function drawSnake(){

    snake.forEach((parts) => {
        drawSnakePart(parts);
    })

}

drawSnake();

function advanceSnake(){
    
}


    