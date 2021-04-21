const scoreDiv = document.getElementById('score-div');
const showPoints = document.getElementById('points');
const btnRstart = document.getElementById('btn-rstart')
const btnStart = document.getElementById('btn-start');
const btnMute = document.getElementById('btn-mute');
const imgMute = document.getElementById('img-mute');


const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth / 100 * 80;
canvas.height = window.innerHeight / 100 * 80;

let frames = 0;
let points = 0;
let raf;
let maxTime = 59;
let enemies = [];
let prizes = [];
let mytimer;

//Sounds
let crashSound;
crashSound = new Sound("./sounds/hit.mp3");

let bgMusic;
bgMusic = new Sound("./sounds/bgmusic.mp3");

//Images
const background = new Image();
background.src = "./images/descarga.jfif";

const player1 = new Image();
player1.src = "./images_corona/boy.png";


//Buttons
btnStart.addEventListener('click', startGame);
btnRstart.addEventListener('click', reStartGame);
btnMute.addEventListener('click', stopSounds);


//Sounds
function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
}

//Start Game
function startGame(){
    const maindiv = document.getElementById('main-div');
    maindiv.insertBefore(canvas, maindiv.childNodes[0]);
    reStartGame()
}

function reStartGame(){ 
    scoreDiv.style.display = "none";
    btnStart.style.display = "none";
    btnMute.style.display = "block";
    bgMusic.play()
    enemies = []
    prizes = [];
    frames = 0;
    points = 0;
    maxTime = 59;
    player.x = canvas.width/2,
    player.y = canvas.height/2,
    updateCanvas()
    mytimer = setInterval(timer, 1000)
}

//Stop sounds TODO: make this work
function stopSounds(){
    bgMusic.stop()
    crashSound.stop()
    imgMute.src='./images/off-mute.png';
}

//Function re-print Canvas
function updateCanvas(){
    raf = requestAnimationFrame(updateCanvas)
    frames +=1;
    draw(background, 0, 0, canvas.width, canvas.height)
    drawMain(player1, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height)
    //playerWalking()
    const randomInt = chooseRandom(80, 120)
    if(frames % randomInt === 0) {
        spawnEnemies()
    }

  /*   if(frames % randomInt === 0) {
        spawnEnemiesRight()
    }
*/
    if(frames % randomInt === 0) {
        spawnPrizes()
    } 
    
    enemies.forEach((enemy)=>{
        enemy.update()
    }) 

    prizes.forEach((prize)=>{
        prize.update()
    }) 

    checkGameOver()
    score()
    printScore()
    printTime()
}


function chooseRandom(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Create Player
let player ={
    x: canvas.width/2,
    y: canvas.height/2,
    width: 32,
    height: 48,
    speed: 10,
    frameX: 0,
    frameY: 0,
    //moving: false
}

function drawMain(img, sX, sY, sW, wH, x, y, w, h){
    ctx.drawImage(img, sX, sY, sW, wH, x, y, w, h)
}

function draw(img,x, y, w, h){
    ctx.drawImage(img, x, y, w, h)
}


//Enemies
class Enemy{
    constructor(imgsrc, x, y, w, h, velocity){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.velocity = velocity;
        this.img = new Image()
        this.img.src = imgsrc; //Porque si quito esto coge la pelusa?
    }

    draw(){
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
    

    update(){
        this.draw()
        this.x += 1

        /* this.x = this.x + this.velocity.x;
        this.y = this.y +this.velocity.y */
    }
}


function spawnEnemies(){
        const x = 0;
        const w = 70;
        const h = 50;
        const y = chooseRandom(0, (canvas.height - h));
        const velocity = 1 /* {
            x:1,
            y:1
        } */
        enemies.push(new Enemy("./images_corona/covid.png", x, y, w, h, velocity))
}

function spawnPrizes(){
    const x = 0;
    const w = 70;
    const h = 40;
    const y = chooseRandom(0, (canvas.height - h));
    const velocity = 2 
    prizes.push(new Enemy("./images_corona/vac.png", x, y, w, h, velocity))
}


//Move Player
document.addEventListener('keydown', movePlayer) 
function movePlayer (e) {
    //player.moving = true;
    switch (e.keyCode) {
        case 38:
            if(player.y > 0){
                player.y -= player.speed;
                player.frameY = 3;
            }
            break;
        case 40:
            if(player.y < (canvas.height - player.height)){
                player.y += player.speed;
                player.frameY = 0;
            }
            break;
        case 37:
            if(player.x > 0){
                player.x -= player.speed;
                player.frameY = 1;
            }
            break;
        case 39:
            if(player.x < (canvas.width - player.width)){
                player.x += player.speed;
                player.frameY = 2;
            }
            break;
    }
};

/* document.addEventListener('keyup', stopPlayer);
function stopPlayer(){
    player.moving = false;
} */

function turnPlayer(){
    if(player.frame<3){
        player.frameX++
    } else{
        player.frameX = 0;
    }
}

/* function playerWalking(){
    if(player.frameX < 3 && player.moving){
        player.frameX++;
    }else{
        player.frameX = 0;
    }    
} */

function checkCrash(object){
    return !((player.y + player.height) < object.y || player.y > (object.y + object.h)|| (player.x + player.width) < object.x || player.x > (object.x + object.w));
} 

function score(){
    const getPoints = prizes.some(function (prize) {
        return checkCrash(prize);
    });
 
    if(getPoints){
        /* console.log('we are in score')
        points += 1;
        console.log(points) */
        //eliminar la vacuna
    }
    
       
}

function checkGameOver() {
    const crashed = enemies.some(function (enemy) {
        return checkCrash(enemy);
    });
   
    if (crashed) {
        stopGame();
    }
}

function stopGame(){
    stopTimer()
    cancelAnimationFrame(raf);
    scoreDiv.style.display = "flex";
    bgMusic.stop()
    crashSound.play();
}


function printScore(){
    ctx.font = '18px serif';
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${points}`, (canvas.width - 100), 50);
    showPoints.innerHTML = points;  
}



function timer(){
    console.log(maxTime)
    maxTime -= 1;
    
    if(maxTime < 0){
      return stopGame()
    }
    
}

function printTime(){
    ctx.font = '18px serif';
    ctx.fillStyle = 'black';
    if(maxTime<10){
        ctx.fillText(`Time: 00:0${maxTime}`, (canvas.width - 100), 25);
    }else{
        ctx.fillText(`Time: 00:${maxTime}`, (canvas.width - 100), 25);
    }
}

function stopTimer() {
    clearInterval(mytimer);
  }