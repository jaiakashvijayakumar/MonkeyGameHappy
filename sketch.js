var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana,bananaIMG;
var obstacle,obstacleIMG;
var FoodGroup,obstacleGroup;
var score = 0;



var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  obstacleIMG = loadImage("stone.png")
  bananaIMG = loadImage("banana.png");

}

function setup() {
  createCanvas(800,400);

  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
}

function draw() { 
  drawSprites();
  textSize(30);
  fill("red")
  text("Score: "+score,300,20);

  

  

  if(gameState===PLAY){

    
 

    food();
    obstacles()
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }


  
    if(keyDown("space") && player.y >= 235) {
      player.velocityY = -17;
    }
    if(FoodGroup.isTouching(player)){

      FoodGroup.destroyEach();
      score = score+1;
      player.scale += 0.1;
     // obstacle.scale -=0.1
      
    }


    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }

  if(obstacleGroup.isTouching(player)){

    console.log("jai");
  gameState = END;
    
  }

  

  if(gameState === END){
    console.log("inside end");

  obstacleGroup.destroyEach();

    FoodGroup.destroyEach();

    player.destroy();

    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }
    

    stroke("red");
    fill("red");
       textSize(30);
  text("Game Over!", 110, 200);
     
}


function food(){
  if(frameCount%80 ===0){
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaIMG);
    banana.y=Math.round(random(120,120));
    banana.scale  = 0.05;
    
    banana.velocityX= -3;

    player.depth = banana.depth +1

    banana.lifetime = 200;
    
    FoodGroup.add(banana);
    
  }
  
}



function obstacles(){
  
  if(frameCount%200===0){
    obstacle = createSprite(300,325,10,10);
   //bstacle.y = Math.round(random(80,100));
    obstacle.addImage(obstacleIMG);
    obstacle.scale = 0.3;
    obstacle.velocityX = -3
    obstacle.lifetime = 200;
    
    obstacleGroup.add(obstacle);
   
    
    
    
  }
}

}