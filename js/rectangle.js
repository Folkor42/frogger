class Rectangle {


    constructor(x, y, w, h) {
        this.left = x;
        this.right = x + w;
        this.top = y;
        this.bottom = y + h;
        }

        intersects(other) {
            return !(this.right < other.left || 
                     this.left > other.right || 
                     this.top > other.bottom ||
                     this.bottom < other.top);
        }

        // show() {
        //     fill(255);
        //     rectMode(CORNERS);
        //     rect(this.left,this.top,this.right,this.bottom);
        // }
  }