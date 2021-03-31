var bg1,bg2;
var play;
var gameState=0;
var soldierI,soldier;
var terrorist1,terrorist2;
var bullet_image;
var enemyGroup=[];
var score=0;
var velocity=-5;
var gunShot;
function preload()
{
	bg1=loadImage("image/bk.jpg");
  bg2=loadImage("image/bk3.jpg");
	soldierI=loadAnimation("image/soldier1.png","image/soldier2.png")
  terrorist1=loadImage("image/enemy1.png")
  terrorist2=loadImage("image/enemy2.png")
  bullet_image=loadImage("image/bullet.png")
  gunShot=loadSound("sounds/gun shot.mp3")
}

function setup() {
	createCanvas(windowWidth, windowHeight);
 
  play = createButton("START");
  play.position(windowWidth/2,windowHeight-100)
  play .style("width","200px")
  play .style("height","65px")
  play .style("font-size","25px")
	play .style("background-color","blue")
  play .style("border-radius","20px")
  play .style("font-weight","bold")

  soldier=createSprite(100,windowHeight-100,10,10);
  soldier.debug=true;
  soldier.setCollider("rectangle",0,0,100,150)
  soldier.addAnimation("soldier",soldierI)
  soldier.scale=0.6

  bullet=createSprite(100,windowHeight-100,10,5);
  bullet.debug=true;
  bullet.addImage("bullet",bullet_image);
  bullet.scale=0.05;
  bullet.visible=false;

  reset = createButton("RESET");
  reset.position(windowWidth/2-100,windowHeight/2+50)
  reset .style("width","200px")
  reset .style("height","65px")
  reset .style("font-size","25px")
	reset .style("background-color","red")
  reset .style("border-radius","20px")
  reset .style("font-weight","bold")
  reset.hide();

}


function draw() {  
  if(gameState===0){
    background(bg2);
    fill("red");
    textSize(30)
    text("SOLDIER'S BRAVERY",windowWidth/2-100,30);
    text("this is what the story goes",windowWidth/2-100,windowHeight/2)
    play.mousePressed(()=>{
      gameState=1;
      play.hide();

    })
  }

  if(gameState===1){
    background(bg1);
    spawnEnemies();
    if(keyDown("space")){
       bullet.visible=true;
       bullet.velocityX=12;
       bullet.x=soldier.x;
       bullet.y=soldier.y;
       gunShot.play();
    }
    if(bullet.x>windowWidth){
      bullet.x=0;
      bullet.y=0;
      bullet.visible=false;
      bullet.velocityX=0;
    }
      for(var i=0;i<enemyGroup.length;i++ ){
          if(bullet.isTouching(enemyGroup[i])){
            enemyGroup[i].destroy();
            score=score+10;
            bullet.visible=false;
          }
          if(enemyGroup[i].isTouching(soldier)){
            gameState=2;
   
         }
      }

     

      textSize(25);
      fill("black")
      text("SCORE:"+score,windowWidth-200,30);

  }
   else if(gameState===2){
       background(0);
       soldier.visible=false;
       textSize(35);
       fill("red")
       text("GAME OVER ",windowWidth/2-100,windowHeight/2);
       reset.show();
       reset.mousePressed(()=>{
        gameState=1;
        reset.hide();
        score=0;
        soldier.visible=true;
      })
   }

  
  drawSprites();
 
}

function spawnEnemies(){
   if(frameCount%200===0){
      enemy=createSprite(windowWidth,windowHeight-100,20,20);
      enemy.debug=true;
      enemy.setCollider("rectangle",0,0,100,150)
      random1=Math.round(random(1,2));
      if(random1===1){
        enemy.addImage('terrorist1',terrorist1);
        
      }
      else if(random1===2){
        enemy.addImage('terrorist2',terrorist2);
      }
       enemyGroup.push(enemy);
       enemy.velocityX=velocity;

       if(score%50===0&&score>0){
          velocity=velocity-3
       }
       
   }


}
function spawnBullets(){
  bullet=createSprite(100,windowHeight-100,10,5);
  bullet.addImage("bullet",bullet_image);
  bullet.scale=0.05;
  bullet.velocityX=7
}