class Obstacle extends Rectangle {
    constructor(typeOfObstacle,x, y, w, h, img, speed) {
        super(x, y, w, h);
        this.img = img;
        this.w=w;
        this.speed=speed;
        this.fillcolor=255;
        this.typeOfObstacle=typeOfObstacle;
    }

    update(){
        this.left += this.speed;
        this.right += this.speed;
        if (this.speed > 0 && this.left > width+this.w){
            this.left = -this.w;
            this.right = this.left+this.w;
        }
        if (this.speed < 0 && this.right < 0){
            this.left = this.w+width;
            this.right = this.left+this.w;
        }
        if (this.typeOfObstacle == "logs")
        {
            if (this.intersects(frog))
                {
                    frogOk=true;
                } 
        }
    }

    show() {
        // fill(this.fillcolor);
        // rectMode(CORNERS);
        // rect(this.left,this.top,this.right,this.bottom);
        // text(this.w,this.left,this.top);
        image(this.img, this.left, this.top);
    }
}