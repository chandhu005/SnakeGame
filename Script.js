let gameContainer = document.querySelector(".game-container")
let scoreContainer = document.querySelector(".score-container");

let foodX,foodY;
let headX = 12,headY = 12;
let velocityX=0,velocityY=0;
let snakeBody = [];
let score = 0;

function generateFood(){
    foodX = Math.floor(Math.random()*25) + 1;
    foodY = Math.floor(Math.random()*25) + 1;
    //if the food is generate inside the snake body it will generate food again
    for(let i=0;i<snakeBody.length;i++){
        if(snakeBody[i][1] == foodY && snakeBody[i][0] == foodX){
            generateFood();
        }
    }
}


function gameOver(){
    headX = 12;
    headY = 12;
    generateFood();
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    score = 0;
    scoreContainer.innerHTML = "Score : " + score
    alert("Game Over");
}

 // arr [ 1,2,3] --> [0,1,2,3] unshift
 //arr [1,2,3] --> [1,2,3,4] push()




function renderGame(){
    console.log("Rendered ");
    let updatedGame = `<div class="food" style="grid-area: ${foodY}/${foodX};"></div>`;
    // after eating the food only we need to create another food for that 
    //if the headof the snake is equal to head of the food then we will generate the food here.
    // and same will be added to snake body grow 
    if(foodX == headX && headY == foodY){
        snakeBody.push([foodX,foodY]);
        generateFood();// to generate new food we call this method here
        score+=10;
        scoreContainer.innerHTML = "Score : " + score
    }

    snakeBody.pop(); //while moving in the UI it is incerasing automatically if we delete the last we will remove that problem
    headX+=velocityX;
    headY+=velocityY;
    snakeBody.unshift([headX,headY]);
    if(headX == 0 || headY == 0 || headX == 26 || headY == 26){
        gameOver();
    }
    //if the snake body touches itself we need to gameover for that we created this 
    for(let i=1;i<snakeBody.length;i++){
        if(snakeBody[0][0] == snakeBody[i][0] && snakeBody[0][1] == snakeBody[i][1]){
            gameOver();
        }
    }
///  if the snake is grow we need to show them thats why we use loop here 
    for(let i=0;i<snakeBody.length;i++){
        updatedGame += `<div class="snake" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`
    }
    

    gameContainer.innerHTML = updatedGame;
}

generateFood();
setInterval(renderGame,150);

document.addEventListener("keydown",function(e){
    console.log(e.key);
    let key = e.key;
    if(key == "ArrowUp" && velocityY!=1){
        velocityX = 0;
        velocityY = -1;
    }else if(key == "ArrowDown" && velocityY!=-1){
        velocityX = 0;
        velocityY = 1;
    }else if(key == "ArrowLeft" && velocityX!=1){
        velocityY = 0;
        velocityX = -1;
    }else if(key == "ArrowRight" && velocityX!=-1){
        velocityY = 0;
        velocityX = 1;
    }
})