const btnStart = document.getElementById('btn-start');
const canvas = document.createElement('canvas');

let ctx = canvas.getContext('2d');

btnStart.addEventListener('click', startGame);

//Start Game
function startGame(){
    const maindiv = document.getElementById('main-div');
    maindiv.insertBefore(canvas, maindiv.childNodes[0]);
    btnStart.style.display = "none";
    //interval = setInterval(updateObs, 20);
    updateCanvas();

}

//Print India
class India {
    constructor() {
      this.x = 0;
      this.y = 50;
  
      // Load the image
      const img = new Image();
      img.addEventListener('load', () => {
        // Once image loaded => draw
        this.img = img;
        this.draw();
      });
      img.src = './images/india.jpg';
    }
    moveUp() {
      this.y -= 25;
    }
    moveDown() {
      this.y += 25;
    }
    moveLeft() {
      this.x -= 25;
    }
    moveRight() {
      this.x += 25;
    }
    draw() {
      ctx.drawImage(this.img, this.x, this.y, 40, 40);
    }
  }
  
  const india = new India();

  document.addEventListener('keydown', moveIndia) 
  function moveIndia (e) {
    switch (e.keyCode) {
      case 38:
        india.moveUp();
        break;
      case 40:
        india.moveDown();
        break;
      case 37:
        india.moveLeft();
        break;
      case 39:
        india.moveRight();
        break;
    }
    updateCanvas();
  };
  
  //FIN move India

  
//Print and Move ARROWS
const arrow = new Image(); // Create new <img> element
arrow.src = './images/arrow.png';

let speed1 = 0;
let speed2 = 0;
let speed3 = 0;





function updateCanvas() {
    // clear the canvas
    ctx.clearRect(0, 0, 800, 400);
  
    // redraw the canvas
    india.draw()
    ctx.drawImage(arrow, speed1, 10, 60, 20);
    ctx.drawImage(arrow, speed2, 50, 60, 20);
    ctx.drawImage(arrow, speed3, 80, 60, 20); 

    speed1 += 1;
    speed2 += 2;
    speed3 += 3;

    requestAnimationFrame(updateCanvas);
  }
  
  
  

//Choose Random
function chooseRandom(max){
    return Math.floor(Math.random()*max); 
}
 
//MOVE BACKGROUND
const bg_img = new Image();
bg_img.src = "./images/pelusa.jpg"

const backgroundImage = {
  bg_img: bg_img,
  x: 0,
  speed: -1,

  move: function() {
    this.x += this.speed;
    this.x %= canvas.width; //I dont understand this
  },

  draw: function() {
    ctx.drawImage(this.bg_img, this.x, 0);
    if (this.speed < 0) {
      ctx.drawImage(this.bg_img, this.x + canvas.width, 0);
    } else {
      ctx.drawImage(this.bg_img, this.x - this.bg_img.width, 0);
    }
  },
};

 function updateCanvasPelusa() {
  backgroundImage.move();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  backgroundImage.draw();

  requestAnimationFrame(updateCanvas6);
} 

// start calling updateCanvas once the image is loaded
bg_img.onload = updateCanvas;

/* 
const arrArrows =[
    new Arrow(60, 60, arrow, false, 40, 40),
    new Arrow((chooseRandom(canvas.width)), (chooseRandom(canvas.height)), arrow, false, 40, 40),
    new Arrow((chooseRandom(canvas.width)), (chooseRandom(canvas.height)), arrow, false, 40, 40),
    new Arrow((chooseRandom(canvas.width)), (chooseRandom(canvas.height)), arrow, false, 40, 40),
]

function makeArrow(){
    arrArrows.push(new Arrow((chooseRandom(canvas.width)), (chooseRandom(canvas.height)), arrow, false, 40, 40))
}

function drawArrow(){
    arrArrows.forEach(function(oneArrw){
        oneArrw.x +=1;
        oneArrw.draw();
    })
};
 */
/* const updateArrows = function(){
    drawArrow();
    requestAnimationFrame(updateArrows);
} */


//Print Canvas


/*
const printCanvas = { 
    canvas: document.createElement('canvas'),
    start: function(){
        this.canvas.width = 900;
        this.canvas.height = 500;
        this.count = 0;
        this.lives = 3;
        this.frame = 0;
        this.context = this.canvas.getContext('2d');
        const maindiv = document.getElementById('main-div');
        maindiv.insertBefore(this.canvas, maindiv.childNodes[0]);

        if (this.interval % 50 === 0){
            this.count++;
        }

        //Print main character
        printElements("./images/india.jpg", 350); 

        //Update elements every 20milsec
        this.interval = setInterval(updateObs, 20);
    },

    clear: function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },

    stop: function () {
        clearInterval(this.interval);
    }
}
 */
/* const arrObst = ["./images/arrow.png","./images/flecha_hacia_abajo.png","./images/pelusa.jpg"];
const arrAwards = [];
let imgHeight ;
let y = 0;
let x = 0;

let totalHeight= ((printCanvas.canvas.height - imgHeight)+ imgHeight);


const main = new Component("./images/india.jpg", (printCanvas.width/2), (printCanvas.height/2));
const bad1 = new Component("./images/arrow.png", printCanvas.width, chooseRandom() )
const bad2 = new Component("./images/flecha_hacia_abajo.png",)

main.update()

//Print time
ctx = printCanvas.context;
console.log('Aqui',ctx);
console.log(printCanvas.start)
/* ctx.fillStyle = "black";
ctx.font = "10px sans-serif";
ctx.textAlign = "right";
ctx.textBaseline = "top";
ctx.fillText(printCanvas.count, 650, 0); */

//Create Elements */


/* function printElements(imgSrc, x, y){ 
    if((x < printCanvas.width) && (y < printCanvas.height)){ //not getting out of borders
        const ctx = printCanvas.context;
        const img = new Image();
        img.src = imgSrc;
        imgHeight = img.height;
        //x= printCanvas.width-10
        ctx.drawImage(img, x , y, 50, 50);// check if we can remove w and h or change them to w and h
    }
} */



/* //Print Obstacles
let randomObst=[];
function printNewObstacle(){
    printCanvas.frame +=1 ;
    y = chooseRandom(totalHeight);
    if(printCanvas.frame % 60 === 0){
        let randomIdx = chooseRandom(arrObst.length);
        randomObst.push(arrObst[randomIdx]);
        console.log('you just created a new obj!')
        //imprimir aqui o push y ya se imprimirá la siguiente vuelta?
    }
} */

//move Obstacles
/* function updateObs(){
    console.log('hello! you are inside updateObs');
    x+= 0.5;
    printCanvas.clear();
    for( const obst of randomObst){
        printElements(obst);
    }
    printNewObstacle()
} */

//Move India - Print and clear
/* function moveIndia(){ //updateGameArea
    printCanvas.clear()
    printElements("./images/india.jpg");
}

 
//Move India - Keyboard
document.addEventListener('keydown', moveObj);
function moveObj(e){
    if(y <= totalHeight){
        switch(e.keyCode){
            case 38: //up
                y-=10;
                console.log('up', y, imgHeight, total);
                moveIndia()
            break; //down
            case 40:
                y+=10;
                console.log('down', y);
                moveIndia()
        }
    }
} */


//check if crashed


/* window.addEventListener('keydown', moveCar); 
function moveCar(e){
   if(e.keyCode == '37' && x>60){ 
   x-=10
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   paintGame()
   }
   if(e.keyCode == '39' && x<395){ 
    x+=10
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paintGame()
 }
} */
/* document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
      case 38: // up arrow
        player.speedY -= 1;
        break;
      case 40: // down arrow
        player.speedY += 1;
        break;
      case 37: // left arrow
        player.speedX -= 1;
        break;
      case 39: // right arrow
        player.speedX += 1;
        break;
    }
  }); */

/* document.addEventListener('keydown', (e)=>{
    if(y <= printCanvas.width){
        switch(e.keyCode){
            case 37: //left
                x-=10;
            break; //right
            case 39:
                x+=10;
        }
    }
}) */

//Score

//Game over
