const btnStart = document.getElementById('btn-start');
const canvas = document.createElement('canvas');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = null;
let count = 0;
let lives = 3;
let frame = 0;

if (canvas.getContext) {
  ctx = canvas.getContext('2d');
} else {
  // canvas-unsupported code here
  alert('upgrade!!! nooowwww')
}

btnStart.addEventListener('click', startGame);

function startGame(){
    console.log('stargame');
    const maindiv = document.getElementById('main-div');
    maindiv.insertBefore(canvas, maindiv.childNodes[0]);
    printElements("./images/india.jpg",50,50)
}


function printElements(imgSrc, x, y){ 
    if((x < printCanvas.width) && (y < printCanvas.height)){ //not getting out of borders
        const ctx = printCanvas.context;
        const img = new Image();
        img.src = imgSrc;
        imgHeight = img.height;
        //x= printCanvas.width-10
        ctx.drawImage(img, x , y, 50, 50);// check if we can remove w and h or change them to w and h
    }
}

/* 
//Start button
const btnStart = document.getElementById('btn-start');

//Print Canvas
class StartGame{
    constructor(){
        this.width = 900;
        this.height = 500;
        this.count = 0;
        this.lives = 3;
        this.frame = 0;
        this.canvas = document.createElement('canvas');
        this.context = null;
    }

    start(){
        this.context = this.canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height= this.height;
        const maindiv = document.getElementById('main-div');
        maindiv.insertBefore(this.canvas, maindiv.childNodes[0]);
        this.interval = setInterval(this.updateGameArea, 20);
       //this.play1 = new Component()
    }

    clear(){
        //console.log('you are inside clear')
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    updateGameArea(){
        startGame.clear();
        play1.newPos();
        play1.update();
        updateObstacles();
        checkGameOver();
    } 

    stop(){
        clearInterval(this.interval);
    }
    
    score (){
        const points = Math.floor(this.frames / 5);
        this.context.font = '18px serif';
        this.context.fillStyle = 'black';
        this.context.fillText(`Score: ${points}`, 350, 50);
    }
}

const startGame = new StartGame();
btnStart.addEventListener('click', function(){
    startGame.start()
    btnStart.style.display = "none";//TODO make this work
}) 

const play1 = new Component(50 , 50, 50, 50);

document.addEventListener('keydown', movePlayer); //CHANGED
function movePlayer(e){
    switch (e.keyCode) {
      case 38: // up arrow
      console.log('speedY', play1.speedY)
        play1.speedY -= 1;
        break;
      case 40: // down arrow
        play1.speedY += 1;
        break;
      case 37: // left arrow
        play1.speedX -= 1;
        break;
      case 39: // right arrow
        play1.speedX += 1;
        break;
    }
  };

 document.addEventListener('keyup', (e) => {
    play1.speedX = 0;
    play1.speedY = 0;
}); 

  const myObstacles = [];

  function updateObstacles() {
    for (i = 0; i < myObstacles.length; i++) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
      }
    startGame.frames += 1;
    if (startGame.frames % 120 === 0) {
      let x = startGame.canvas.width;
      let minHeight = 20;
      let maxHeight = 200;
      let height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
      let minGap = 50;
      let maxGap = 200;
      let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
      myObstacles.push(new Component(10, height, 'green', x, 0));
      myObstacles.push(new Component(10, x - height - gap, 'green', x, height + gap));
    }
  }

  function checkGameOver() {
    const crashed = myObstacles.some(function (obstacle) {
      return play1.crashWith(obstacle);
    });
  
    if (crashed) {
        startGame.stop();
    }
  }
  
   */