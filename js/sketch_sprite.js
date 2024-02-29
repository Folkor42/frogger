let sprite_sheet;
let sprite_frog_data;
let sprite_car_data;

let animation =[];
let cararray =[];
let frogs=[];
let frogHopSound;
let music;

function preload() {
    sprite_frog_data=loadJSON('/frogger/assets/frog.json');
    sprite_car_data=loadJSON('/frogger/assets/cars.json');
    sprite_sheet=loadImage('/frogger/assets/frogger-game-sprites.png');
    frogHopSound=loadSound('/frogger/assets/sound-frogger-hop.wav');
    music=loadSound('/frogger/assets/01.mp3');
  }

function setup() {
    var canvas = createCanvas(770, 770);
    canvas.parent('sketch-holder');
    angleMode(DEGREES);
    let frames = sprite_frog_data.frames;
    for (let i = 0; i < frames.length; i++) {
      let pos = frames[i].position;
      let img = sprite_sheet.get(pos.x, pos.y, pos.w, pos.h);
      animation.push(img);
    }
    frogs[0] = new Sprite(animation, 350, 700, 0.25);
    //music.loop();
    let carimages = sprite_car_data.cars;
    for (let i = 0; i < carimages.length; i++) {
      let pos = carimages[i].position;
      let img = sprite_sheet.get(pos.x, pos.y, pos.w, pos.h);
      cararray.push(img);
    }
    console.log(cararray);
   }

function draw() {
  background(100);
  image(cararray[0], 100, 100);
  image(cararray[1], 100, 200);
  image(cararray[2], 100, 300);
  image(cararray[3], 100, 400);
  image(cararray[4], 100, 500);
  fill(200);
  rect(0,700,770,70);
  frogs[0].show();
  if (frogs[0].moving!=false) {
    frogs[0].animate();
  }
  
}

function keyPressed() {
    if (frogs[0].moving !=false) {
      return;
    }
    if (keyCode === UP_ARROW) {
      frogHopSound.play();
      frogs[0].moving='up';
      frogs[0].lastfacing='up';
     } else if (keyCode === DOWN_ARROW) {
      frogHopSound.play();
      frogs[0].moving='down';
      frogs[0].lastfacing='down';
    } else if (keyCode === LEFT_ARROW) {
      frogHopSound.play();
      frogs[0].moving='left';
      frogs[0].lastfacing='left';
    } else if (keyCode === RIGHT_ARROW) {
      frogHopSound.play();
      frogs[0].moving='right';
      frogs[0].lastfacing='right';
    }
  }