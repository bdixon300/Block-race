

var width = 600;
var height = 750;

var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', {preload: preload, create: create, update: update });


//variable declaration 

var score = 0;

var gameOverMessage;
var highScoreMessage;


var highscoreTruth = true;

var template_construction_left = [];
var template_construction_right = [];




var random;
var random2;
var random3;




var player = [];
var leftWalls = [];
var rightWalls = [];
var leftWallsWidth = 50;
var outOfGame;

var left_obstacles_1_template_1 = [];


var left_obstacles_1_template_2 = [];
var left_obstacles_2_template_2 = [];
var left_obstacles_3_template_2 = [];



var left_obstacles_1_template_3 = [];





var right_obstacles_1_template_1 = [];



var right_obstacles_1_template_2 = [];
var right_obstacles_2_template_2 = [];
var right_obstacles_3_template_2 = [];


var right_obstacles_1_template_3 = [];





var ObstacleNumber = 0;
var wallNumber = 0;





var RandomGeneration = [];


var spacebar;
var key;
var truth = true;





//loading function

function preload()
{
    
    game.load.image("walls", "column.png");
    game.load.image("player", "player.png");
    game.load.image("obstacle", "obstacles.png");
    game.load.image("Large_obstacles", "Large_obstacles.png");
    game.load.image("Sharp_Obstacles", "Sharp_Obstacles.png");
    game.load.image("Sharp_Obstacles_right", "Sharp_obstacle_right.png");
    game.load.image("obstacleKiller", "Large_obstacles2.png");
}


// creation funtion

function create()
{      
    
    //enabling arcade physics engine
    
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = "#FF0000";
    
    //create border of game

    wallGeneration();



    
    //walls[2] = game.add.sprite(125, 300, "Large_obstacles");
    //walls[2].enableBody = true;
    //game.physics.arcade.enable(walls[2]);
    //walls[2].body.immovable = true;
    
    
    //create player
    
    player[0] = game.add.sprite(game.world.centerX, 325, "player");
    player[0].enableBody = true;
    game.physics.arcade.enable(player[0]);
    player[0].body.gravity.x = -1800;
    player[0].scale.setTo(1, 1);

    outOfGame = game.add.sprite(0, 0, "walls");
    outOfGame.scale.setTo(20, 0.02);
    outOfGame.enableBody = true;
    game.physics.arcade.enable(outOfGame);


   // game.time.events.loop(Phaser.Timer.SECOND, obstacleGenerationa, this);
    
    highScoreMessage = game.add.text(225, 600, "Time Alive: " + score);
    
    
    
    game.time.events.loop(Phaser.Timer.SECOND * 2, GeneratingObstacles, this);


        game.time.events.loop(Phaser.Timer.SECOND, highScore, this);

    
    //spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(doubleJumpCenter);



    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(jumpCenter);



}





function update()
{





    if (truth)
    {
    player[0].body.gravity.x = -3600;
    }
    if (!truth) {

          player[0].body.gravity.x = 3600;
      }



    
        
    
  
        game.physics.arcade.collide(player[0], leftWalls, configureToRight);
        game.physics.arcade.collide(player[0], rightWalls, configureToLeft);
    

        game.physics.arcade.collide(player[0], outOfGame, playerDead);
    
    
    
        game.physics.arcade.collide(player[0], left_obstacles_1_template_1,  configureToRight);
       // game.physics.arcade.overlap(obstacleKiller, left_obstacles_1_template_1,  obstacleDeath_template1);
    
    
    
        game.physics.arcade.collide(player[0], left_obstacles_1_template_2,  configureToRight);
       // game.physics.arcade.overlap(obstacleKiller, left_obstacles_1_template_2,  obstacleDeath_template2);
        game.physics.arcade.collide(player[0], left_obstacles_2_template_2,  configureToRight);
        //game.physics.arcade.overlap(obstacleKiller, left_obstacles_2_template_2,  obstacleDeath_template2);
        game.physics.arcade.collide(player[0], left_obstacles_3_template_2,  configureToRight);
        //game.physics.arcade.overlap(obstacleKiller, left_obstacles_3_template_2,  obstacleDeath_template2);
        //game.physics.arcade.collide(player[0], left_obstacles_3[i],  configureToRight);
    
    

    
    
        game.physics.arcade.collide(player[0], left_obstacles_1_template_3,  playerDead);
       // game.physics.arcade.overlap(obstacleKiller, left_obstacles_1_template_3,  obstacleDeath_template3);
        
        game.physics.arcade.collide(player[0], right_obstacles_1_template_1,  configureToLeft);
        //game.physics.arcade.overlap(obstacleKiller, right_obstacles_1_template_1,  obstacleDeath_template1);
    

        game.physics.arcade.collide(player[0], right_obstacles_1_template_2, configureToLeft);
    
        game.physics.arcade.collide(player[0], right_obstacles_2_template_2,  configureToLeft);
       // game.physics.arcade.overlap(obstacleKiller, right_obstacles_1_template_2,  obstacleDeath_template2);
        game.physics.arcade.collide(player[0], right_obstacles_3_template_2,  configureToLeft);
       // game.physics.arcade.overlap(obstacleKiller, right_obstacles_3_template_2,  obstacleDeath_template2);
    
    
    
        game.physics.arcade.collide(player[0], right_obstacles_1_template_3,  playerDead);
        //game.physics.arcade.overlap(obstacleKiller, right_obstacles_1_template_3,  obstacleDeath_template3);
        //game.physics.arcade.collide(player[0], right_obstacles[i]);
    
    
    
       //game.physics.arcade.collide(player[0], Large_Left_Obstacles[0], obstaclecollision);
        //game.physics.arcade.collide(player[0], Large_Left_Obstacles[1], obstaclecollision); 
   
    
    
}






 function jumpCenter()
 {


     // Ben Insert configure to right / left code here, so that the variable scoping works-- otherwise truth never becomes false







        if ((truth))
        {
            jumpLeft();


        }

        if ((!truth))
        {
            //player[0].kill();

            jumpRight();

        }




 }


function doubleJumpCenter()
{

    if (truth)
    {

        doubleJumpLeft();

    }

    if (!truth)
    {

        doubleJumpRight();

    }





}


function jumpLeft()
{

    player[0].body.velocity.x = 1200;


}




function jumpRight()
{

    player[0].body.velocity.x = -1200;




}



function doubleJumpLeft()
{


    player[0].body.velocity.x = 2400;

}


function doubleJumpRight()
{


    player[0].body.velocity.x = -2400;

}












function configureToRight()
{
    //player.body.velocity.x = 0;
    truth = true;
    player[0].body.gravity.x = 0;
    
    
    
    
}




function configureToLeft()
{
    //player.body.velocity.x = 0;
    truth = false;
   player[0].body.gravity.x = 0;


}








































 template_construction_left[0] = function(x, y, z)
{
    
    
    
    left_obstacles_1_template_1[z] = game.add.sprite(x, y, "Large_obstacles");
    game.physics.arcade.enable(left_obstacles_1_template_1[z]); 
    left_obstacles_1_template_1[z].enableBody = true;
    left_obstacles_1_template_1[z].body.velocity.y = -300;
    left_obstacles_1_template_1[z].scale.setTo(0.3, 0.7);
    left_obstacles_1_template_1[z].body.immovable = true; 
   // left_obstacles_1_template_1[z].checkWorldBounds = true;
   // left_obstacles_1_template_1[z].outOfBoundsKill = true;
    ObstacleNumber = ObstacleNumber + 1;



}



 template_construction_left[1] = function(x, y, z)
{
     
    left_obstacles_1_template_2[z] = game.add.sprite(x, y, "Large_obstacles");
    game.physics.arcade.enable(left_obstacles_1_template_2[z]);
    left_obstacles_1_template_2[z].enableBody = true;
    left_obstacles_1_template_2[z].body.velocity.y = -300;
    left_obstacles_1_template_2[z].scale.setTo(0.3, 0.7);
    left_obstacles_1_template_2[z].body.immovable = true; 
   // left_obstacles_1_template_2[z].checkWorldBounds = true;
   // left_obstacles_1_template_2[z].outOfBoundsKill = true;
    
    //left_obstacles_1_template_2[z].outOfBoundsKill = true;
    
    
     left_obstacles_2_template_2[z] = game.add.sprite(x, (y + 200), "Large_obstacles");
    game.physics.arcade.enable(left_obstacles_2_template_2[z]);
    left_obstacles_2_template_2[z].enableBody = true;
    left_obstacles_2_template_2[z].body.velocity.y = -300;
    left_obstacles_2_template_2[z].scale.setTo(0.7, 0.7);
    left_obstacles_2_template_2[z].body.immovable = true; 
   //  left_obstacles_2_template_2[z].checkWorldBounds = true;
   // left_obstacles_2_template_2[z].outOfBoundsKill = true;
    
     left_obstacles_3_template_2[z] = game.add.sprite(x, (y + 400), "Large_obstacles");
    game.physics.arcade.enable(left_obstacles_3_template_2[z]);
    left_obstacles_3_template_2[z].enableBody = true;
    left_obstacles_3_template_2[z].body.velocity.y = -300;
    left_obstacles_3_template_2[z].scale.setTo(0.3, 0.7);
    left_obstacles_3_template_2[z].body.immovable = true; 
   //  left_obstacles_3_template_2[z].checkWorldBounds = true;
    //left_obstacles_3_template_2[z].outOfBoundsKill = true;
     
    ObstacleNumber = ObstacleNumber + 1;
    
    
}


 template_construction_left[2] = function(x, y, z)
{
    
     left_obstacles_1_template_3[z] = game.add.sprite(x, y, "Sharp_Obstacles");
    game.physics.arcade.enable(left_obstacles_1_template_3[z]);
    left_obstacles_1_template_3[z].enableBody = true;
    left_obstacles_1_template_3[z].body.velocity.y = -300;
    left_obstacles_1_template_3[z].scale.setTo(0.5, 0.7);
    left_obstacles_1_template_3[z].body.immovable = true; 
   // left_obstacles_1_template_3[z].checkWorldBounds = true;
    //left_obstacles_1_template_3[z].outOfBoundsKill = true;
     
     
    ObstacleNumber = ObstacleNumber + 1;
    
    
    
    //left_obstacles_4[z].scale.x = -1; 
    
    
    
    
    
    
}



template_construction_left[3] = function()
{
    
    
    
    
    
    
    
    
}


 template_construction_right[0] = function(x, y, z)
{
   
      right_obstacles_1_template_1[z] = game.add.sprite(x, y, "Large_obstacles");
    right_obstacles_1_template_1[z].anchor.setTo(1, 1);
    game.physics.arcade.enable(right_obstacles_1_template_1[z]);
    right_obstacles_1_template_1[z].enableBody = true;
    right_obstacles_1_template_1[z].body.velocity.y = -300;
    right_obstacles_1_template_1[z].scale.setTo(0.3, 0.7);
    right_obstacles_1_template_1[z].body.immovable = true; 
    
     //right_obstacles_1_template_2[z].checkWorldBounds = true;
   // right_obstacles_1_template_2[z].outOfBoundsKill = true;
    
    ObstacleNumber = ObstacleNumber + 1;
     
     
   
    
    
    
}




 template_construction_right[1] = function(x, y, z)
{
    
     
      right_obstacles_1_template_2[z] = game.add.sprite(x, y, "Large_obstacles");
     right_obstacles_1_template_2[z].anchor.setTo(1, 1);
    game.physics.arcade.enable(right_obstacles_1_template_2[z]);
    right_obstacles_1_template_2[z].enableBody = true;
    right_obstacles_1_template_2[z].body.velocity.y = -300;
    right_obstacles_1_template_2[z].scale.setTo(0.3, 0.7);
    right_obstacles_1_template_2[z].body.immovable = true; 
    //right_obstacles_1_template_1[z].checkWorldBounds = true;
    //right_obstacles_1_template_1[z].outOfBoundsKill = true;
        
     
        right_obstacles_2_template_2[z] = game.add.sprite(x, (y + 200), "Large_obstacles");
     right_obstacles_2_template_2[z].anchor.setTo(1, 1);
    game.physics.arcade.enable(right_obstacles_2_template_2[z]);
    right_obstacles_2_template_2[z].enableBody = true;
    right_obstacles_2_template_2[z].body.velocity.y = -300;
    right_obstacles_2_template_2[z].scale.setTo(0.7, 0.7);
    right_obstacles_2_template_2[z].body.immovable = true; 
    //right_obstacles_2_template_1[z].sprite.checkWorldBounds = true;
    //right_obstacles_2_template_1[z].outOfBoundsKill = true;
      //right_obstacles_2_template_1[z].checkWorldBounds = true;
    //right_obstacles_2_template_1[z].outOfBoundsKill = true;
     
     
     
    
 right_obstacles_3_template_2[z] = game.add.sprite(x, (y + 400), "Large_obstacles");
     right_obstacles_3_template_2[z].anchor.setTo(1, 1);
    game.physics.arcade.enable(right_obstacles_3_template_2[z]);
    right_obstacles_3_template_2[z].enableBody = true;
    right_obstacles_3_template_2[z].body.velocity.y = -300;
    right_obstacles_3_template_2[z].scale.setTo(0.3, 0.7);
    right_obstacles_3_template_2[z].body.immovable = true; 
    //right_obstacles_3_template_1[z].checkWorldBounds = true;
    //right_obstacles_3_template_1[z].outOfBoundsKill = true;
    
    ObstacleNumber = ObstacleNumber + 1;
     
     
     
     
     
     
     
     
     
     
     
     
     
     
 
    
}


 template_construction_right[2] = function(x, y, z)
{
    
    right_obstacles_1_template_3[z] = game.add.sprite(x, y, "Sharp_Obstacles_right");
    right_obstacles_1_template_3[z].anchor.setTo(1, 0);
    game.physics.arcade.enable(right_obstacles_1_template_3[z]);
    right_obstacles_1_template_3[z].enableBody = true;
    right_obstacles_1_template_3[z].body.velocity.y = -300;
    right_obstacles_1_template_3[z].scale.setTo(0.5, 0.75);
   right_obstacles_1_template_3[z].body.immovable = true;
    // right_obstacles_1_template_3[z].checkWorldBounds = true;
    //right_obstacles_1_template_3[z].outOfBoundsKill = true;
     
    ObstacleNumber = ObstacleNumber + 1;
    
}

 template_construction_right[3] = function()
{
    
    
    
}




    
 function GeneratingObstacles(i)
{


    
    
 random3 = game.rnd.integerInRange(0, 1);


    wallGeneration();


    // random generator dictates which side of the game is safe
    RandomGeneration[random3]();







    
}
 
 
 


 RandomGeneration[0] = function()
{
    
    

    random = game.rnd.integerInRange(0, 2); 
    random2 = game.rnd.integerInRange(5, 10);
    
        // right side is not safe for the block
    
    template_construction_left[random](leftWallsWidth, height + 200, ObstacleNumber);
    for (var i = 0; i < (random2 / 2); i++)
    {
    template_construction_right[2](width - leftWallsWidth, height + 200 + (100 * i), ObstacleNumber);
    }
    
    
    
    
    
    
    
    
}


RandomGeneration[1] = function()
{

    // left side is not safe for block
    
    random = game.rnd.integerInRange(0, 2); 
    random2 = game.rnd.integerInRange(5, 10);
  
    template_construction_right[random](width - leftWallsWidth, height + 200, ObstacleNumber);
    for (var i = 0; i < (random2 / 2); i++)
    {
    template_construction_left[2](leftWallsWidth, height + 200 + (100 * i), ObstacleNumber);
    }
    
    
    
    
    
    
    
    
    
}




function wallGeneration()
{

    leftWalls[wallNumber] = game.add.sprite(0, wallNumber * 650, "walls");
    leftWalls[wallNumber].enableBody = true;
    game.physics.arcade.enable(leftWalls[wallNumber]);
    leftWalls[wallNumber].body.immovable = true;
    leftWalls[wallNumber].body.velocity.y = -300;
    leftWalls[wallNumber].scale.setTo(1, 3);





    rightWalls[wallNumber] = game.add.sprite(width, wallNumber * 650, "walls");
    rightWalls[wallNumber].anchor.setTo(1, 0);
    rightWalls[wallNumber].enableBody = true;
    game.physics.arcade.enable(rightWalls[wallNumber]);
    rightWalls[wallNumber].body.immovable = true;
    rightWalls[wallNumber].body.velocity.y = -300;
    rightWalls[wallNumber].scale.setTo(1, 3);


    wallNumber = wallNumber + 1;



}

function playerDead()
{

    player[0].kill();

    var style = {

        fill: "#FFFFFF"

    };

    gameOverMessage = game.add.text(50, game.world.centerY, "Game over, press the spacebar to retry", style);



    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(reloadGame);


    highscoreTruth = false;


}

function reloadGame()
{

    location.reload();


}




function highScore()
{


    if (highscoreTruth) {



        score++;

        highScoreMessage.text = "Time Alive: " + score;

    }

}




















