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

    death(){
        image(this.splat, this.left-(grid/2), this.top-(grid/2));
    }

    move(x,y) { 
        if (this.left + x >= 0 && this.right + x <= width && this.top + y >= 0 && this.bottom + y <= height)
        {
        this.left += x;
        this.right += x;
        this.top += y;
        this.bottom += y;
        score++;
        return true;
        } else {
            return false;
        }
    }
}