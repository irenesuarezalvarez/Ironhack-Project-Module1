const btnStart = document.getElementById('btn-start');
const canvas = document.createElement('canvas');

const ctx = canvas.getContext('2d');
let frames = 0;
const enemies = []
canvas.width = window.innerWidth / 100 * 80;
canvas.height = window.innerHeight / 100 * 80;

const background = new Image();
background.src = "./images/descarga.jfif";

const player1 = new Image();
player1.src = "./images/india.jpg";

const arrEnemy = new Image()
arrEnemy.src = "./images/arrow.png";


btnStart.addEventListener('click', startGame);

//Start Game
function startGame(){
    const maindiv = document.getElementById('main-div');
    maindiv.insertBefore(canvas, maindiv.childNodes[0]);
    btnStart.style.display = "none";
    updateCanvas()  
}

//Function re-print CanvasTODO Fix enemies
function updateCanvas(){
    requestAnimationFrame(updateCanvas)
    frames +=1;
    draw(background, 0, 0, canvas.width, canvas.height)
    draw(player1, player.x, player.y, player.width, player.height)
    console.log(enemies.length)
    const randomInt = chooseRandom(80, 120)

    if(frames % randomInt === 0) {
        spawnEnemies()
    }
    
    enemies.forEach((enemy)=>{
        enemy.update()
    }) 
    
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
        const y = chooseRandom(0, canvas.height);
        const w = 60;
        const h = 40;
        const velocity = {
            x:1,
            y:1
        }
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
  updateCanvas();
};

