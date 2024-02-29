// Daniel Shiffman
// http://youtube.com/thecodingtrain
// https://thecodingtrain.com/CodingChallenges/111-animated-sprite.html

// Horse Spritesheet from
// https://opengameart.org/content/2d-platformer-art-assets-from-horse-of-spring

// Animated Sprite
// https://youtu.be/3noMeuufLZY

class Sprite {
    constructor(animation, x, y, speed) {
      this.x = x;
      this.y = y;
      this.animation = animation;
      this.w = this.animation[0].width;
      this.len = this.animation.length;
      this.speed = speed;
      this.index = 0;
      this.moving = false;
      this.lastfacing='up';
      this.maxx=700;
      this.maxy=700;
      this.minx=0;
      this.miny=0;
      console.log(this.minx,this.maxx,this.miny,this.maxy);
    }
  
    show() {
      let index = floor(this.index) % this.len;
      let newx=this.x;
      let newy=this.y;
      if ((this.moving == 'up') || (this.lastfacing=='up')) 
      {
        translate(this.x+60, this.y+80);
        rotate(180);
      }
      if ((this.moving == 'down') || (this.lastfacing=='down')){
        newx+=60;
        newy+=80;
        translate(this.x, this.y);
        rotate(0);
      }
      if ((this.moving == 'left') || (this.lastfacing=='left')){
        newy+=60;
        translate(this.x+80, this.y);
        rotate(90);
      }
      if ((this.moving == 'right') || (this.lastfacing=='right'))
      {
        newx=this.x+80;
        translate(this.x, this.y+60);
        rotate(-90);
      }
      image(this.animation[index], 0, 0);
    }
  
    animate() {
      if (this.index >= this.len) {
        this.moving = false;
        this.index = 0;
      }else{
      this.index += this.speed;
      if (this.moving == 'up') {
        if (this.y < this.miny) {
          this.y = this.miny;
          this.moving=false;
          this.lastfacing='up';
          this.index=0;
        } else 
        {
          this.y-=this.speed*10;
        }
      }
      if (this.moving == 'down') 
      {
        if (this.y < this.maxy) {
          this.y += this.speed*10;
        } else 
        {
          this.y=this.maxy;
          this.moving=false;
          this.lastfacing='down';
          this.index=0;
        }
      }
      if (this.moving == 'left') {
        if (this.x < this.minx) {
          this.x = this.minx;
          this.moving=false;
          this.lastfacing='left';
          this.index=0;
        } else 
        {
          this.x-=this.speed*10;
        }
      }
      if (this.moving == 'right') 
      {
        if (this.x > this.maxx) {
          this.x=this.maxx;
          this.moving=false;
          this.lastfacing='right';
          this.index=0;
        } else 
        {
          this.x += this.speed*10;
        }
      }
    }
    }
  }