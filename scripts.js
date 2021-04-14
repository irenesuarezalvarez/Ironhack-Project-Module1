// windows upload?
window.onload = () => {

//Start button
const btnStart = document.getElementById('btn-start');

btnStart.onclick = function(){
    printCanvas.start()
}

let y = 0;
//Print Canvas
const printCanvas = { //myGameArea
    canvas: document.createElement('canvas'),
    start: function(){
        this.canvas.width = 900;
        this.canvas.height = 500;
        this.context = this.canvas.getContext('2d');
        const maindiv = document.getElementById('main-div');
        maindiv.insertBefore(this.canvas, maindiv.childNodes[0]);
        printElements();
        //this.interval = setInterval(printElements, 20);
        },
        clear: function(){
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}

const arrObst = [];
const arrAwards = [];

//Create Elements
function printElements(imgSrc){ //Component update
    const ctx = printCanvas.context;
    const img = new Image();
    img.src = imgSrc;
    ctx.drawImage(img, 55, y, 50, 50);
}

//Move India //Print and clear
function moveIndia(){ //updateGameArea
    y+=5 //here you chose the speed
    printCanvas.clear()
    printElements("./images/india.jpg");
}

 
//Move elements
document.addEventListener('keydown', moveObj);
function moveObj(e){
    if(y <= printCanvas.canvas.height){
        switch(e.keyCode){
            case 38: //up
                y-=10;
                console.log('up');
            break; //down
            case 40:
                y+=10;
                console.log('down');
        }
    }
}
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

}