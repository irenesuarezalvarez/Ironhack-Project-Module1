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
let raf;
let enemies = []

let crashSound;
crashSound = new Sound("./sounds/hit.mp3");

let bgMusic;
bgMusic = new Sound("./sounds/bgmusic.mp3")

const background = new Image();
background.src = "./images/descarga.jfif";

const player1 = new Image();
player1.src = "./images/india.jpg";

const arrEnemy = new Image()
arrEnemy.src = "./images/arrow.png";


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
    scoreDiv.style.display = "none";
    btnStart.style.display = "none";
    btnMute.style.display = "block";
    bgMusic.play()
    updateCanvas()  
}

function reStartGame(){ 
    scoreDiv.style.display = "none";
    btnStart.style.display = "none";
    btnMute.style.display = "block";
    bgMusic.play()
    enemies = []
    frames = 0
    player.x = canvas.width/2,
    player.y = canvas.height/2,
    updateCanvas()  
}

//Stop sounds

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
    draw(player1, player.x, player.y, player.width, player.height)
    
    const randomInt = chooseRandom(80, 120)
    if(frames % randomInt === 0) {
        spawnEnemies()
    }
    
    enemies.forEach((enemy)=>{
        enemy.update()
    }) 

    checkGameOver()
    score()
}


function chooseRandom(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Print Player and background
let player ={
    x: canvas.width/2,
    y: canvas.height/2,
    width: 40,
    height: 60,
    speed: 10
}


function draw(img, x, y, w, h){
    ctx.drawImage(img, x, y, w, h)
}


//Enemies

class Enemy{
    constructor(img, x, y, w, h, velocity){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.velocity = velocity;
        this.img = img;
        this.img.src = "./images/arrow.png";
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
        const w = 60;
        const h = 40;
        const y = chooseRandom(0, (canvas.height - h));
        const velocity = 1 /* {
            x:1,
            y:1
        } */
        enemies.push(new Enemy(arrEnemy, x, y, w, h, velocity))
 
}


//Move Player
document.addEventListener('keydown', movePlayer) 
function movePlayer (e) {
  switch (e.keyCode) {
    case 38:
        player.y -= player.speed;
        break;
    case 40:
        player.y += player.speed;
        break;
    case 37:
        player.x -= player.speed;
        break;
    case 39:
        player.x += player.speed;
        break;
  }
};

function checkCrash(enemy){
    console.log('youre inside checkcrash')
    return !((player.y + player.height) < enemy.y || player.y > (enemy.y + enemy.h)|| (player.x + player.width) < enemy.x || player.x > (enemy.x + enemy.w));
} 

function checkGameOver() {
    const crashed = enemies.some(function (enemy) {
    return checkCrash(enemy);
    });
   
    if (crashed) {
        bgMusic.stop()
        crashSound.play();
        stopGame();
    }
}
function stopGame(){
    cancelAnimationFrame(raf);
    scoreDiv.style.display = "flex";

}


function score(){
    const points = Math.floor(frames / 50);
    ctx.font = '18px serif';
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${points}`, (canvas.width - 100), 50);
    showPoints.innerHTML = points;  
}

