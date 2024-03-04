class Lane extends Rectangle {
    constructor(typeOfObstacle,laneNumber, oCount, length, spacing,speed,objectimg) {
        let y = laneNumber * grid;
        super(0, y, width, grid);
        this.typeOfObstacle=typeOfObstacle;
        this.obstacles=[];
        this.speed = speed;
        for (let i = 0; i < oCount; i ++) {
            let obstacle;
            let offset= random(0,(length/2*grid));
            // console.log(offset);
            obstacle = new Obstacle(typeOfObstacle,offset + (i * spacing), this.top, grid * length, grid, objectimg, this.speed);
            this.obstacles.push(obstacle);
            // if (i>0 && obstacle.intersects(this.obstacles[i-1])){
            //     console.log("Intersecting");
            //     obstacle.fillcolor=(100);
            //     this.obstacles[i].left+=width;
            //     this.obstacles[i].right=this.obstacles[i].left+this.obstacles[i].w;
            // }
            //console.log(laneNumber,this.obstacles[i].left);
        }
    }

    run(){
        for (let obstacle of this.obstacles) {
            obstacle.show();
            obstacle.update();
        }
    }

    check(frog){
        let obstacle;
        if (this.typeOfObstacle=="cars")
        for (obstacle of this.obstacles){
            if (frog.intersects(obstacle)){
                frog.death();
                frogSquishSound.play();
                resetFrog();
            }
        };
        if (this.typeOfObstacle=="logs")
        {
            let frogOk = false;
            for (obstacle of this.obstacles){
                if (frog.intersects(obstacle)){
                    frogOk=true;
                    frog.attach(obstacle);
                }
            }
            if (!frogOk)
            {
                frog.death();
                frogPlunkSound.play();
                resetFrog();
            }
        }
        if (this.typeOfObstacle=="safety"){
            
        };
    }
}