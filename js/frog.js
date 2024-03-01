class Frog extends Rectangle {
    constructor(x, y, w, h, frogimg,splatimg) {
        super(x, y, w, h);
        this.img = frogimg;
        this.splat=splatimg;
    }
    show() {
        // fill(255);
        // rectMode(CORNERS);
        // rect(this.left,this.top,this.right,this.bottom);
        image(this.img, this.left, this.top);
    }

    attach(log) {
        this.move(log.speed, 0);
    }

    update() {
        if (this.left < 0) {
            this.move(grid, 0);
        }
        if (this.right > width) {
            this.move(-grid, 0);
        }
        if (this.top < 0) {
            this.move(0, grid);
        }
        if (this.bottom > height) {
            this.move(0, -grid);
        }
    }

    death(){
        lives--;
        image(this.splat, this.left-(grid/2), this.top-(grid/2));
    }

    move(x,y) { 
        if (this.left + x >= 0 && this.right + x <= width && this.top + y >= 0 && this.bottom + y <= height)
        {
        this.left += x;
        this.right += x;
        this.top += y;
        this.bottom += y;
        return true;
        } else {
            return false;
        }
    }
}