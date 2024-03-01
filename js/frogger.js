grid=50;
cars=[];
logs=[];
let frogHopSound;
let frogSquishSound;
let frogHomeSound;
let music;
var score=0;
var highscore=0;
var lives=2;
var lowest=450;
gameState=0;

function preload(){
    logimg=loadImage('assets/log.png');
    img=loadImage('assets/frog.png');
    livesimg=loadImage('assets/frog.png');
    img2=loadImage('assets/red-car.png');
    img3=loadImage('assets/red-car-left.png');
    road=loadImage('assets/road.png');
    splat=loadImage('assets/splat.png');
    frogHopSound=loadSound('/frogger/assets/sound-frogger-hop.wav');
    frogSquishSound=loadSound('/frogger/assets/sound-frogger-squash.wav');
    frogPlunkSound=loadSound('/frogger/assets/sound-frogger-plunk.wav');
    frogHomeSound=loadSound('/frogger/assets/songRespawn_G.mp3');
    music=loadSound('/frogger/assets/01.mp3');
    music.setVolume(0.25);
}

function resetGame(){
    resetFrog();
    highscore=score>highscore?score:highscore;
    score=0;
    lives=2;
    music.play();
}
function resetFrog(){
    frog = new Frog(300, 450, 50, 50,img,splat);
    lowest=450;
}
function titleScreen(){
    fill(0);
    textSize(32);
    text("Frogger", 300, 200);
    textSize(16);
    text("Press Enter to Play", 300, 300);
    if (keyCode === ENTER){
        resetGame();
        gameState=1;
    }
}

function showScore(){
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text(score, 10, 35);
    text(highscore, 500, 35);
}

function showLives(){
    for (i=0;i<lives;i++)   
        image(livesimg, i*30, 460);
}

function checkScore(){
    if (frog.top < lowest)
    {
        score+=10;
        lowest=frog.top;
    }
    if (frog.top == 0)
        {
            score+=200;
            lowest=450;
            frogHomeSound.play();
            resetFrog();
        }
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
    livesimg.resize(grid/2,grid/2);
    
}

function draw(){
if (gameState==1)
    { 
        background(0);
    
        fill(100);
        rect(0,0,650,500);
        fill(0,0,200);
        rect(0,50,650,210);
        image(road,0,290,650,170);
        showLives();
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
                    frog.attach(log);
                }
            }
            if (!frogok)
            {
                console.log("drown");
                frog.death();
                frogPlunkSound.play();
                resetFrog();
            }
        }
        
        frog.update();
        frog.show();
        for (car of cars){
            car.update();
            car.show();
            if (frog.intersects(car)){
                console.log("hit");
                task_done = false;
                frog.death();
                frogSquishSound.play();
                resetFrog();
            }
        }
        if (lives<0)
        {
            music.stop();
            lives=2;
            highscore=0;
            alert("Game Over, restarting...");            
            resetGame();
        }
        showScore(); 
    }
    else if (gameState==0)
    {
        titleScreen();
    }
}

function keyPressed(){
    if (keyCode === UP_ARROW){
        if (frog.move(0,-grid))
            {
                frogHopSound.play();
                checkScore();
            }
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