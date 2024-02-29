class Log extends Car{
    constructor(x, y, w, h, img, speed) {
        super(x, y, w, h, img, speed);
    }
    update(){
        this.left += this.speed;
        this.right += this.speed;
        if (this.speed > 0 && this.left > width){
            this.left = -this.w-grid*4;
            this.right = this.left+this.w;
        }
        if (this.speed < 0 && this.right < 0-grid*3){
            this.left = width+grid*4;
            this.right = this.left+this.w;
        }
    }
    show() {
        // fill(255);
        // rectMode(CORNERS);
        // rect(this.left,this.top,this.right,this.bottom);
        image(this.img, this.left, this.top);
    }
}