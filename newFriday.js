const timeDiv = document.getElementById('time-div');
const livesDiv = document.getElementById('lives-div');
const scoreDiv = document.getElementById('score-div');
const showPoints = document.getElementById('points');
const btnRstart = document.getElementById('btn-rstart')
const btnStart = document.getElementById('btn-start');
const btnMute = document.getElementById('btn-mute');
const imgMute = document.getElementById('img-mute');

//TODO: fix in files
//Music button + re-start form 0
//Objts tardan mucho en salir

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth / 100 * 80;
canvas.height = window.innerHeight / 100 * 80;

let raf;
let frames = 0;
let lives = 3;
let points = 0;
let maxTime = 59;
let enemies = [];
let prizes = [];
let mytimer;

//Sounds
let ouchSound;
ouchSound = new Sound("./sounds/ouch.mp3");

let pointSound;
pointSound = new Sound("./sounds/point.mp3");

let applauseSound;
applauseSound = new Sound("./sounds/applause.mp3");

let crashSound;
crashSound = new Sound("./sounds/hit.mp3");

let gameOverSound;
gameOver = new Sound("./sounds/gameOver.mp3");

let victorySound;
victorySound = new Sound("./sounds/victory.mp3");

let girlPziferSound;
girlPzifer = new Sound("./sounds/girlPzifer.mp3");

let bgMusic;
bgMusic = new Sound("./sounds/myCorona.mp3");

//Images
const background = new Image();
background.src = "./images_corona/bg_city.jpg";

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
    lives = 3;
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
    draw(background, 0, 0, canvas.width, canvas.height);
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
         enemies.forEach((enemy, idx)=>{
            if (!((player.y + player.height) < enemy.y || player.y > (enemy.y + enemy.h)|| (player.x + player.width) < enemy.x || player.x > (enemy.x + enemy.w))){
                if(lives > 0){
                    ouchSound.play()
                    enemies.splice(idx, 1);
                    lives -= 1;
                }else{
                    livesDiv.style.display = "block";
                    stopGame();
                    youLose()
                }
                
            }
        }) 
    }) 

    prizes.forEach((prize)=>{
        prize.update()
        prizes.forEach((prize, idx)=>{
            if (!((player.y + player.height) < prize.y || player.y > (prize.y + prize.h)|| (player.x + player.width) < prize.x || player.x > (prize.x + prize.w))){
                pointSound.play()
                prizes.splice(idx, 1);
                points += 10;
                checkGameWin()
            }
        })
    }) 

    printLives()
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
class Object{
    constructor(imgsrc, x, y, w, h, velocity){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.velocity = velocity;
        this.img = new Image()
        this.img.src = imgsrc;
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
        const w = 50;
        const h = 50;
        const y = chooseRandom(0, (canvas.height - h));
        const velocity = 1 /* {
            x:1,
            y:1
        } */
        enemies.push(new Object("./images_corona/covid.png", x, y, w, h, velocity))
}

function spawnPrizes(){
    const x = 0;
    const w = 40;
    const h = 40;
    const y = chooseRandom(0, (canvas.height - h));
    const velocity = 2 
    prizes.push(new Object("./images_corona/vac.png", x, y, w, h, velocity))
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

/* function checkCrash(object){
    return !((player.y + player.height) < object.y || player.y > (object.y + object.h)|| (player.x + player.width) < object.x || player.x > (object.x + object.w));
}  */

/* 

function score(){
    prizes.forEach((object, idx)=>{
        if((player.y + player.height) < object.y || player.y > (object.y + object.h)|| (player.x + player.width) < object.x || player.x > (object.x + object.w)){
            prizes.splice(idx, 1);
        }
    })

   /*  const getPoints = prizes.some(function (prize) {
        return checkCrash(prize);
    });

    if(getPoints){
        console.log('cucu');
    } */
   /*  if(getPoints){
        
        console.log('Point', points)
        return points = points + 1;
        
        /*
        points += 1;
        console.log(points) 
        //eliminar la vacuna
    } 
} */

/* function checkGameOver() {
    const crashed = enemies.some(function (enemy) {
        return checkCrash(enemy);
    });
   
    if (crashed) {
        if(lives > 0){
            prizes.forEach((enemy, idx)=>{
                if (!((player.y + player.height) < enemy.y || player.y > (enemy.y + enemy.h)|| (player.x + player.width) < enemy.x || player.x > (enemy.x + enemy.w))){
                    enemies.splice(idx, 1);
                    lives -= 1;
                }
            })
        }else{
            stopGame();
            //livesDiv.style.display = flex;
        }
        
    }
}
 */
function stopGame(){
    stopTimer()
    cancelAnimationFrame(raf);
    scoreDiv.style.display = "flex";
    bgMusic.stop()
    
}

function checkGameWin(){
    printScore()
    if(points >= 100){
        stopGame()
        victorySound.play();
        applauseSound.play();
    }
}


function youLose(){
    crashSound.play();
    gameOverSound.play()
}


function timer(){
    maxTime -= 1;
    if(maxTime < 0){
        timeDiv.style.display = "block"
        stopGame()
        return youLose()
    }
}

function printData(text, x, y){
    ctx.font = '18px serif';
    ctx.fillStyle = 'black';
    ctx.fillText(text, x, y);
}

function printLives(){
    printData(`Lives: ${lives}`, (canvas.width - 90), 25 )
}
function printScore(){
    printData(`Score: ${points}`, (canvas.width - 90), 50);
    showPoints.innerHTML = points;  
}

function printTime(){
    if(maxTime<10){
        printData(`Time: 00:0${maxTime}`, 25, 25);
    }else{
        printData(`Time: 00:${maxTime}`, 25, 25);
    }
}

function stopTimer() {
    clearInterval(mytimer);
  }