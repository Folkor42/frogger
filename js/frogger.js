grid=50;
cars=[];
logs=[];
lanes=[];
let animation =[];
let frogHopSound;
let frogSquishSound;
let frogHomeSound;
let music;
var score=0;
var highscore=0;
var lives=2;
var highestLane=9;
gameState=3;
var frogOk;

function gameModeChange(mode){
    gameState=mode;
    resetGame();
}
function preload(){
    sprite_frog_data=loadJSON('/frogger/assets/frog.json');
    sprite_car_data=loadJSON('/frogger/assets/cars.json');
    sprite_sheet=loadImage('/frogger/assets/frogger-game-sprites.png');

    logimg4=loadImage('assets/log.png');
    logimg3=loadImage('assets/log.png');
    logimg2=loadImage('assets/log.png');
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
    music.stop();
    // music.loop();
}
function resetFrog(){
    frog = new Frog(grid*6, grid*9,grid,grid,animation,splat);
    highestLane=9;
}
function titleScreen(){
    music.stop();
    clear();
    background(255);
    textSize(32);
    fill(0,200,0);
    stroke(0,100,0);
    strokeWeight(3);
    text("Frogger", width/2-grid, height/2);
    textSize(16);
    text("Press Enter to Play", width/2-grid-10, height/2+grid);
    if (keyCode === ENTER){
        resetGame();
        gameState=1;
    }
}

function titleScreen2(){
    music.stop();
    clear();
    background(0);
    textSize(32);
    fill(0,200,0);
    stroke(0,100,0);
    strokeWeight(2);
    text("Frogger", width/2-grid, height/2);
    textSize(16);
    text("Press Enter to Play", width/2-grid-10, height/2+grid);
    if (keyCode === ENTER){
        resetGame();
        gameState=2;
    }
    
}

function showScore(){
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text(score, grid/5, grid*.7);
    text(highscore, grid*10, grid*.7);
}

function showLives(){
    for (i=0;i<lives;i++)   
        image(livesimg, i*(grid*.6), grid*9+(grid*.2));
}

function checkScore(){
    if (frog.top/grid < highestLane)
    {
        score+=10;
        highestLane--;
    }
    if (frog.top < grid)
        {
            score+=200;
            highestLane=9;
            lives++;
            frogHomeSound.play();
            resetFrog();
        }
}

function setup(){
    angleMode(DEGREES);
    console.log(sprite_frog_data);
    let frames = sprite_frog_data.frames;
    console.log(frames.length);
    for (let i = 0; i < frames.length; i++) {
      let pos = frames[i].position;
      let frame = sprite_sheet.get(pos.x, pos.y, pos.w, pos.h);
      animation.push(frame);
    }
    // Scale images to grid size
    img.resize(grid,grid);
    splat.resize(grid*2,grid*2);
    img2.resize(grid*2,grid);
    img3.resize(grid*2,grid);
    logimg.resize(grid,grid);
    logimg2.resize(grid*2,grid);
    logimg3.resize(grid*3,grid);
    logimg4.resize(grid*4,grid);
    livesimg.resize(grid/2,grid/2);
    var canvas= createCanvas(grid*13, grid*10);
    canvas.parent('game');
    resetGame();
    
    totalLanes=floor(height/grid);
    lanes=[totalLanes];
    // console.log(lanes);
    
    // for (i=0;i<totalLanes;i++)
    // {
    //     if (i%2==0)
    //     {
    //         lanes[i]=new Lane(i*grid,random(1,5),2,200);
    //     }
    //     else
    //     {
    //         lanes[i]=new Lane(i*grid,random(1,5),2,200);
    //     }
    // }

    // Safety Lane
    lanes[0]=new Lane('safety',0,0,0,0,0,img);
    // Logs
    lanes[1]=new Lane('logs',1,3,4,400,1,logimg4);
    lanes[2]=new Lane('logs',2,2,2,200,-2,logimg2);
    lanes[3]=new Lane('logs',3,4,3,300,3,logimg3);
    lanes[4]=new Lane('logs',4,3,2,200,-4,logimg2);
    // Safety Lane
    lanes[5]=new Lane('safety',5,0,0,0,0);
    // Cars
    lanes[6]=new Lane('cars',6,3,2,200,1,img2);
    lanes[7]=new Lane('cars',7,3,2,200,-2,img3);
    lanes[8]=new Lane('cars',8,3,2,200,3,img2);
    // Safety Lane
    lanes[9]=new Lane('safety',9,0,0,0,0);
    

    // Row 1
    cars= [9];
    index=0;
    // Row 1
    for (i=0;i<2;i++){
        x = i*300+random(150)+100;
        cars[index] = new Obstacle('cars',x,grid*8,100,48,img2,1.5);
        index++;
    }
    // Row 2
    for (i=0;i<2;i++){
        x = i*300+random(150)+100;
        cars[index] = new Obstacle('cars',x,grid*7,100,48,img3,-2);
        index++;
    }
    // Row 3
    for (i=0;i<3;i++){
        x = i*300+random(150)+100;
        cars[index] = new Obstacle('cars',x,grid*6,100,48,img2,2.5);
        index++;
    }
    
    
    // Switch to LOGS
    logs=[12];
    index=0;
    
    // Row 5
    for (i=0;i<3;i++){
        x = i*350+random(250)+100;
        logs[index] = new Obstacle('logs',x,grid*4,grid*3,grid,logimg3,1.25);
        index++;
    }
    // Row 6
    for (i=0;i<3;i++){
        x = i*350+random(150)+100;
        logs[index] = new Obstacle('logs',x,grid*3,grid*3,grid,logimg3,-1.5);
        index++;
    }
    // Row 7
    for (i=0;i<3;i++){
        x = i*350+random(250)+100;
        logs[index] = new Obstacle('logs',x,grid*2,grid*3,grid,logimg3,2);
        index++;
    }
    // Row 8
    for (i=0;i<3;i++){
        x = i*350+random(100)+100;
        logs[index] = new Obstacle('logs',x,grid*1,grid*3,grid,logimg3,-1);
        index++;
    }

    
    
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
    else if (gameState==2)
    {
        background(0);
        
        fill(100);
        rect(0,0,grid*13,grid*10);
        fill(0,0,200);
        rect(0,grid,grid*13,grid*4);
        image(road,0,grid*6,width,grid*3);
        for (lane of lanes){
            lane.run();
        }
        let laneIndex=floor(frog.top/grid);
        lanes[laneIndex].check(frog);
        
        showLives();
        showScore();  
        frog.update();
        frog.show();
        // if (frog.moving!=false) {
        //     frog.animate();
        //   }
        if (lives<0)
        {
            music.stop();
            lives=2;
            highscore=0;
            alert("Game Over, restarting...");            
            resetGame();
        }
    }
    else if (gameState==3)
    {
        titleScreen2();
    }
}

function keyPressed(){
    if (keyCode === UP_ARROW){
        if (frog.move(0,-grid))
            {
                frogHopSound.play();
                frog.moving='up';
                frog.lastfacing='up';
                checkScore();
            }
    } else if (keyCode === DOWN_ARROW){
        if (frog.move(0,grid))
            {
                frogHopSound.play();
                frog.moving='down';
                frog.lastfacing='down';
            }
    } else if (keyCode === LEFT_ARROW){
        if (frog.move(-grid,0))
            {
                frogHopSound.play();
                frog.moving='left';
                frog.lastfacing='left';
            }
    } else if (keyCode === RIGHT_ARROW){
        if (frog.move(grid,0))
            {
                frogHopSound.play();
                frog.moving='right';
                frog.lastfacing='right';
            }
    }
}