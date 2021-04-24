//Objects
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
