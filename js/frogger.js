grid=50;
cars=[];
logs=[];
lanes=[];
let frogHopSound;
let frogSquishSound;
let frogHomeSound;
let music;
var score=0;
var highscore=0;
var lives=2;
var highestLane=9;
gameState=3;
// Possible Game States:
// 0: Title Screen (Simple Mode)
// 1: Game Play (Simple Mode)
// 2: Game Play (Faster Mode)
// 3: Title Screen (Faster Mode)
// 4: Game Over
// 5: Game Win

var frogOk;

function gameModeChange(mode){
    gameState=mode;
    resetGame();
}
function preload(){
    logo2=loadImage('assets/Frogger-logo2.png');
    logo=loadImage('assets/Frogger-logo.png');
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
    music.loop();
}
function resetFrog(){
    frog = new Frog(grid*6, grid*9,grid,grid,img,splat);
    highestLane=9;
}
function titleScreen(){
    music.stop();
    clear();
    background(255);
    image(logo2,0,0);
    textSize(16);
    fill(0);
    stroke(100);
    text("Press Enter to Play", width/2-grid-10, height/2+grid);
    if (keyCode === ENTER){
        resetGame();
        gameState=1;
    }
}

function titleScreenNormal(){
    music.stop();
    clear();
    background(0);
    image(logo,0,0);
    textSize(16);
    fill(255);
    text("Press Enter to Play", width/2-grid, grid*9);
    if (keyCode === ENTER){
        resetGame();
        gameState=2;
    }
    
}

function gameOverScreen(){
    gameState=4;
    music.stop();
    clear();
    background(0);
    textSize(grid);
    fill(0,200,0);
    stroke(0,100,0);
    strokeWeight(2);
    text("Game Over", grid*4, grid*3);
    fill(200);
    text("Score: "+score, grid*4, grid*5);
    textSize(grid/2);
    stroke(0);
    fill(100);
    text("Press Enter to Restart", grid*4, grid*6);
    if (keyCode === ENTER){
        resetGame();
        gameState=3;          
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
    
    // Scale images to grid size
    logo.resize(grid*13,grid*9);
    logo2.resize(grid*13,grid*6);
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
    if (gameState==0)
    {
        titleScreen();
    } else if (gameState==1)
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
        frog.update();
        frog.show();
        if (lives<0)
        {
            gameOverScreen();
        }
        showScore();  
    }
    else if (gameState==3)
    {
        titleScreenNormal();
    }
    else if (gameState==4)
    {
        gameOverScreen();
    }
}

function keyPressed(){
    if (gameState==1 || gameState==2)
    {
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
}