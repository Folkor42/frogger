grid=50;
cars=[];
logs=[];
let frogHopSound;
let frogSquishSound;
let music;
var score=0;
var highscore=0;

function preload(){
    logimg=loadImage('assets/log.png');
    img=loadImage('assets/frog.png');
    img2=loadImage('assets/red-car.png');
    img3=loadImage('assets/red-car-left.png');
    road=loadImage('assets/road.png');
    splat=loadImage('assets/splat.png');
    frogHopSound=loadSound('/frogger/assets/sound-frogger-hop.wav');
    frogSquishSound=loadSound('/frogger/assets/sound-frogger-squash.wav');
    frogPlunkSound=loadSound('/frogger/assets/sound-frogger-plunk.wav');
    music=loadSound('/frogger/assets/01.mp3');
}

function resetGame(){
    frog = new Frog(300, 450, 50, 50,img,splat);
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
    logimg.resize(grid*3,grid);
    var canvas= createCanvas(650, 500);
    canvas.parent('game');
    resetGame();
    // Row 1
    cars= [9];
    index=0;
    // Row 1
    for (i=0;i<3;i++){
        x = i*300+random(150)+100;
        cars[index] = new Car(x,grid*8,100,48,img2,2);
        index++;
    }
    // Row 2
    for (i=0;i<3;i++){
        x = i*300+random(150)+100;
        cars[index] = new Car(x,grid*7,100,48,img3,-3.5);
        index++;
    }
    // Row 3
    for (i=0;i<3;i++){
        x = i*300+random(150)+100;
        cars[index] = new Car(x,grid*6,100,48,img2,2.5);
        index++;
    }
    
    // Switch to LOGS
    index=0;
    
    // Row 5
    for (i=0;i<3;i++){
        x = i*350+random(50)+100;
        logs[index] = new Log(x,grid*4,grid*3,grid,logimg,1);
        index++;
    }
    // Row 6
    for (i=0;i<3;i++){
        x = i*350+random(50)+100;
        logs[index] = new Log(x,grid*3,grid*3,grid,logimg,-1.5);
        index++;
    }
    // Row 7
    for (i=0;i<3;i++){
        x = i*350+random(50)+100;
        logs[index] = new Log(x,grid*2,grid*3,grid,logimg,2);
        index++;
    }
    // Row 8
    for (i=0;i<3;i++){
        x = i*350+random(50)+100;
        logs[index] = new Log(x,grid,grid*3,grid,logimg,-1.75);
        index++;
    }
    
    //music.play();
}

function draw(){
    background(0);
    
    fill(100);
    rect(0,0,650,500);
    fill(0,0,200);
    rect(0,50,650,210);
    image(road,0,290,650,170);
    
    for (log of logs){
        log.update();
        log.show();
    }
    
    if (frog.bottom < grid*6 && frog.bottom > grid)
    {
        frogok = false;
        for (log of logs){
            if (frog.intersects(log)){
                frogok=true;
            }
        }
        if (!frogok)
        {
            console.log("drown");
            frog.death();
            frogPlunkSound.play();
            resetGame();
        }
    }
    

    frog.show();
    for (car of cars){
        car.update();
        car.show();
        if (frog.intersects(car)){
            console.log("hit");
            frog.death();
            frogSquishSound.play();
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