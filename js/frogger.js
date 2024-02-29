grid=50;
cars=[];
let frogHopSound;
let frogSquishSound;
let music;
var img;
var score=0;
var highscore=0;

function preload(){
    img=loadImage('assets/frog.png');
    img2=loadImage('assets/red-car.png');
    img3=loadImage('assets/red-car-left.png');
    road=loadImage('assets/road.png');
    splat=loadImage('assets/splat.png');
    frogHopSound=loadSound('/frogger/assets/sound-frogger-hop.wav');
    frogSquishSound=loadSound('/frogger/assets/sound-frogger-squash.wav');
    music=loadSound('/frogger/assets/01.mp3');
}

function resetGame(){
    frog = new Frog(300, 451, 48, 48,img,splat);
    highscore=score>highscore?score:highscore;
    score=0;
}

function showScore(){
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text(score, 10, 35);
    text(highscore, 500, 35);
}


function setup(){
    angleMode(DEGREES);
    img.resize(grid,grid);
    splat.resize(grid*2,grid*2);
    img2.resize(grid*2,grid);
    img3.resize(grid*2,grid);
    var canvas= createCanvas(650, 500);
    canvas.parent('game');
   resetGame();
    // Row 1
    cars= [10];
    index=0;
    for (i=0;i<3;i++){
        x = i*300+random(150);
        cars[index] = new Car(x,400,100,48,img2,2);
        index++;
    }
    // Row 1
    for (i=0;i<3;i++){
        x = i*300+random(150);
        cars[index] = new Car(x,350,100,48,img3,-3.5);
        index++;
    }
    // Row 1
    for (i=0;i<4;i++){
        x = i*300+random(150);
        cars[index] = new Car(x,300,100,48,img2,2.5);
        index++;
    }
    //music.play();
}

function draw(){
    background(0);
    image(road,0,290,650,170);
    fill(100);
    rect(0,450,650,50);
    rect(0,250,650,50);
    rect(0,0,650,50);
    frog.show();
    for (car of cars){
        car.update();
        car.show();
        if (frog.intersects(car)){
            console.log("hit");
            frog.death();
            frogSquishSound.play();
            setTimeout(1000);
            resetGame();
        }
    }
    showScore();
    
    
}

function keyPressed(){
    if (keyCode === UP_ARROW){
        if (frog.move(0,-grid))
            frogHopSound.play();
    } else if (keyCode === DOWN_ARROW){
        if (frog.move(0,grid))
            frogHopSound.play();
    } else if (keyCode === LEFT_ARROW){
        if (frog.move(-grid,0))
            frogHopSound.play();
    } else if (keyCode === RIGHT_ARROW){
        if (frog.move(grid,0))
            frogHopSound.play();
    }
}