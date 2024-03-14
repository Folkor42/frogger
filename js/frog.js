class Frog extends Rectangle {
    constructor(x, y, w, h, frogAnimation,splatimg) {
        super(x, y, w, h);
        this.animation = frogAnimation;
        this.splat=splatimg;
        this.moving = false;
        this.lastfacing='up';
        this.len = this.animation.length;
        this.index = 0;
        this.speed=floor(grid/this.len);
        this.maxx=width;
        this.maxy=height;
        this.minx=0;
        this.miny=0;
    }
    show() {
        if (this.moving!=false) {
            if (this.index>=this.len-1) {
                this.moving=false;
                this.index=0;
            } 
            else this.index++;
        }
        // Frog Rotations
        let index = this.index; //floor(this.index) % this.len;
        fill(200);
        if ((this.moving == 'up') || (this.lastfacing=='up')) 
        {
            translate(this.left+grid,this.top+grid);
            rotate(180);
            
        }
        if ((this.moving == 'down') || (this.lastfacing=='down')){
            translate(this.left, this.top);
            rotate(0);
        }
        if ((this.moving == 'left') || (this.lastfacing=='left'))
        {
            translate(this.left+grid,this.top);
            rotate(90);
        }
        if ((this.moving == 'right') || (this.lastfacing=='right'))
        {
            translate(this.left,this.top+grid);
            rotate(-90);
        }
        image(this.animation[index],-2,-20,53,80);
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

    animate() {
        if (this.moving == 'up') {
          if (this.top < this.miny) {
            this.top = this.miny;
            this.moving=false;
            this.lastfacing='up';
            this.index=0;
          } else 
          {
            this.top-=this.speed;
            this.bottom-=this.speed;
          }
        }
        if (this.moving == 'down') 
        {
          if (this.top < this.maxy) {
            this.top += this.speed;
            this.bottom += this.speed;
          } else 
          {
            this.top=this.maxy;
            this.moving=false;
            this.lastfacing='down';
            this.index=0;
          }
        }
        if (this.moving == 'left') {
          if (this.left < this.minx) {
            this.left = this.minx;
            this.moving=false;
            this.lastfacing='left';
            this.index=0;
          } else 
          {
            this.left-=this.speed;
          }
        }
        if (this.moving == 'right') 
        {
          if (this.left > this.maxx) {
            this.left=this.maxx;
            this.moving=false;
            this.lastfacing='right';
            this.index=0;
          } else 
          {
            this.left += this.speed;
          }
        }
    }
}