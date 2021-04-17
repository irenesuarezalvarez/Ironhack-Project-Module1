const btnStart = document.getElementById('btn-start');
const canvas = document.createElement('canvas');

let ctx = canvas.getContext('2d');

btnStart.addEventListener('click', startGame);

//Start Game
function startGame(){
    const maindiv = document.getElementById('main-div');
    maindiv.insertBefore(canvas, maindiv.childNodes[0]);
    btnStart.style.display = "none";
    updateCanvas();
}

//Print India
class Player {
    constructor() {
      this.x = 25;
      this.y = 25;
  
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
      ctx.drawImage(this.img, this.x, this.y, 50, 60);
    }
  }
  
  const ghost = new Player();

  document.addEventListener('keydown', moveGhost) 
  function moveGhost (e) {
    switch (e.keyCode) {
      case 38:
        ghost.moveUp();
        console.log('up', ghost);
        break;
      case 40:
        ghost.moveDown();
        console.log('down', ghost);
        break;
      case 37:
        ghost.moveLeft();
        console.log('left', ghost);
        break;
      case 39:
        ghost.moveRight();
        console.log('right', ghost);
        break;
    }
    updateCanvas();
  };
  
  //FIN move India

  function updateCanvas() {
    ctx.clearRect(0, 0, 900, 500);
    ghost.draw();
  }
  
//Print and Move ARROWS
const arrow = new Image(); // Create new <img> element
arrow.src = './images/arrow.png';

let speed1 = 0;
let speed2 = 0;
let speed3 = 0;


function drawCanvas(img, x, y, w, h) {
    ctx.drawImage(img, x, y, w, h);
}



function updateCanvas() {
    speed1 += 1;
    speed2 += 2;
    speed3 += 3;
  
    // clear the canvas
    ctx.clearRect(0, 0, 800, 400);
  
    // redraw the canvas
    ghost.draw()
    ctx.drawImage(arrow, speed1, 10, 60, 20);
    ctx.drawImage(arrow, speed2, 50, 60, 20);
    drawCanvas(arrow, speed3, 80, 60, 20); 
  
    requestAnimationFrame(updateCanvas);
  }
  
  

//Choose Random
function chooseRandom(max){
    return Math.floor(Math.random()*max); 
}
