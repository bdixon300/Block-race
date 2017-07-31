
// Variable declarations
var width = 600;
var height = 750;
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', {preload: preload, create: create, update: update });

// Score for the game
var score = 0;

// Text for the game
var gameOverMessage;
var highScoreMessage;
 var style = {
        fill: "#FFFFFF"
    };
// Boolean stops highscore when the player dies
var highscoreTruth = true;
// Functions for generating obstacles
var template_construction_left = [];
var template_construction_right = [];
// Random variables, used to make obstacle generation random
var random;
var random2;
var random3;
// Main objects in the code
var player;
var leftWalls = [];
var rightWalls = [];
var leftWallsWidth = 50;
var outOfGame;
// Left obstacles
var left_obstacles_1_template_1 = [];
var left_obstacles_1_template_2 = [];
var left_obstacles_2_template_2 = [];
var left_obstacles_3_template_2 = [];
var left_obstacles_1_template_3 = [];
// Right obstacles
var right_obstacles_1_template_1 = [];
var right_obstacles_1_template_2 = [];
var right_obstacles_2_template_2 = [];
var right_obstacles_3_template_2 = [];
var right_obstacles_1_template_3 = [];
// Allows cotinuous generation of obstacles as independent objects
var ObstacleNumber = 0;
var wallNumber = 0;
var RandomGeneration = [];
// Keys for input, and the boolean dictating orientation of gravity and contact with obstacles
var spacebar;
var key;
var truth = true;
var truth2 = true;

//loading function
function preload() {
    game.load.image("walls", "column.png");
    game.load.image("player", "player.png");
    game.load.image("obstacle", "obstacles.png");
    game.load.image("Large_obstacles", "Large_obstacles.png");
    game.load.image("Sharp_Obstacles", "Sharp_Obstacles.png");
    game.load.image("Sharp_Obstacles_right", "Sharp_obstacle_right.png");
    game.load.image("obstacleKiller", "Large_obstacles2.png");
}

// creation funtion
function create() {
    //enabling arcade physics engine
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = "#999999";
    //create border of game
    wallGeneration();
    //create player
    player = game.add.sprite(game.world.centerX, 325, "player");
    player.enableBody = true;
    game.physics.arcade.enable(player);
    player.body.gravity.x = -1800;
    player.scale.setTo(1, 1);
    // Creates object to player if he leaves the game view
    outOfGame = game.add.sprite(0, 0, "walls");
    outOfGame.scale.setTo(20, 0.02);
    outOfGame.enableBody = true;
    game.physics.arcade.enable(outOfGame);
    // Highscore text
    highScoreMessage = game.add.text(225, 600, "Time Alive: " + score, style);
    // Obstacles are generated every two seconds
    game.time.events.loop(Phaser.Timer.SECOND * 2, GeneratingObstacles, this);
    // Score increases every second
    game.time.events.loop(Phaser.Timer.SECOND, highScore, this);
    // double jump means the player can change sides, using the up arrow key
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(doubleJumpCenter);
    // single jump means the player can jump using the spacebar
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(jumpCenter);
}

// Update function (runs at 60fps)
function update() {
    // Gravity acting on the player
    if (truth) {
      player.body.gravity.x = -3600;
    }
    if (!truth) {
      player.body.gravity.x = 3600;
    }

    // Wall collision handlers
    game.physics.arcade.collide(player, leftWalls, configureToRight);
    game.physics.arcade.collide(player, rightWalls, configureToLeft);
    // Player collision handler, out of game view kill
    game.physics.arcade.collide(player, outOfGame, playerDead);
    // left obstacle collision handlers
    game.physics.arcade.collide(player, left_obstacles_1_template_1,  configureToRight);
    game.physics.arcade.collide(player, left_obstacles_1_template_2,  configureToRight);
    game.physics.arcade.collide(player, left_obstacles_2_template_2,  configureToRight);
    game.physics.arcade.collide(player, left_obstacles_3_template_2,  configureToRight);
    game.physics.arcade.collide(player, left_obstacles_1_template_3,  playerDead);
    // Right obstacle collision handlers
    game.physics.arcade.collide(player, right_obstacles_1_template_1,  configureToLeft);
    game.physics.arcade.collide(player, right_obstacles_1_template_2, configureToLeft);
    game.physics.arcade.collide(player, right_obstacles_2_template_2,  configureToLeft);
    game.physics.arcade.collide(player, right_obstacles_3_template_2,  configureToLeft);
    game.physics.arcade.collide(player, right_obstacles_1_template_3,  playerDead);

    if (player.x == width / 2) {
        truth2 = false;
    }
}


function jumpCenter() {
     // Different jump functions called dependent on which side the player is on,
     // the other condition prevents the user flying the character in thin air
     if ((truth) && (player.x < (width / 3.5))) {
            jumpLeft();

          }
     if ((!truth) && (player.x > (width - (width / 3)))) {
            jumpRight();
    }
 }


function doubleJumpCenter() {
    // Function works the same as the previous jump function
    if (truth) {
        doubleJumpLeft();
    }

    if (!truth) {
        doubleJumpRight();
    }
}


function jumpLeft() {
    player.body.velocity.x = 1200;
}


function jumpRight() {
    player.body.velocity.x = -1200;
}


function doubleJumpLeft() {
    player.body.velocity.x = 2400;
}


function doubleJumpRight() {
    player.body.velocity.x = -2400;
}


function configureToRight() {
    // Truth boolean value changes, altering the gravity properties
    truth = true;
    player.body.gravity.x = 0;
    truth2 = true;
}


function configureToLeft() {
    // Truth boolean value changes, altering the gravity properties
    truth = false;
    player.body.gravity.x = 0;
    truth2 = true;
}


 template_construction_left[0] = function(x, y, z) {
    left_obstacles_1_template_1[z] = game.add.sprite(x, y, "Large_obstacles");
    game.physics.arcade.enable(left_obstacles_1_template_1[z]);
    left_obstacles_1_template_1[z].enableBody = true;
    left_obstacles_1_template_1[z].body.velocity.y = -300;
    left_obstacles_1_template_1[z].scale.setTo(0.3, 0.7);
    left_obstacles_1_template_1[z].body.immovable = true;
    ObstacleNumber = ObstacleNumber + 1;
};

 template_construction_left[1] = function(x, y, z) {
    left_obstacles_1_template_2[z] = game.add.sprite(x, y, "Large_obstacles");
    game.physics.arcade.enable(left_obstacles_1_template_2[z]);
    left_obstacles_1_template_2[z].enableBody = true;
    left_obstacles_1_template_2[z].body.velocity.y = -300;
    left_obstacles_1_template_2[z].scale.setTo(0.3, 0.7);
    left_obstacles_1_template_2[z].body.immovable = true;

    left_obstacles_2_template_2[z] = game.add.sprite(x, (y + 200), "Large_obstacles");
    game.physics.arcade.enable(left_obstacles_2_template_2[z]);
    left_obstacles_2_template_2[z].enableBody = true;
    left_obstacles_2_template_2[z].body.velocity.y = -300;
    left_obstacles_2_template_2[z].scale.setTo(0.6, 0.7);
    left_obstacles_2_template_2[z].body.immovable = true;

    left_obstacles_3_template_2[z] = game.add.sprite(x, (y + 400), "Large_obstacles");
    game.physics.arcade.enable(left_obstacles_3_template_2[z]);
    left_obstacles_3_template_2[z].enableBody = true;
    left_obstacles_3_template_2[z].body.velocity.y = -300;
    left_obstacles_3_template_2[z].scale.setTo(0.3, 0.7);
    left_obstacles_3_template_2[z].body.immovable = true;

    ObstacleNumber = ObstacleNumber + 1;
};


template_construction_left[2] = function(x, y, z) {
    left_obstacles_1_template_3[z] = game.add.sprite(x, y, "Sharp_Obstacles");
    game.physics.arcade.enable(left_obstacles_1_template_3[z]);
    left_obstacles_1_template_3[z].enableBody = true;
    left_obstacles_1_template_3[z].body.velocity.y = -300;
    left_obstacles_1_template_3[z].scale.setTo(0.5, 0.7);
    left_obstacles_1_template_3[z].body.immovable = true;

    ObstacleNumber = ObstacleNumber + 1;
};


template_construction_left[3] = function() {
      // Creates blank space
};


template_construction_right[0] = function(x, y, z) {

    right_obstacles_1_template_1[z] = game.add.sprite(x, y, "Large_obstacles");
    right_obstacles_1_template_1[z].anchor.setTo(1, 1);
    game.physics.arcade.enable(right_obstacles_1_template_1[z]);
    right_obstacles_1_template_1[z].enableBody = true;
    right_obstacles_1_template_1[z].body.velocity.y = -300;
    right_obstacles_1_template_1[z].scale.setTo(0.3, 0.7);
    right_obstacles_1_template_1[z].body.immovable = true;

    ObstacleNumber = ObstacleNumber + 1;
};


 template_construction_right[1] = function(x, y, z) {

    right_obstacles_1_template_2[z] = game.add.sprite(x, y, "Large_obstacles");
    right_obstacles_1_template_2[z].anchor.setTo(1, 1);
    game.physics.arcade.enable(right_obstacles_1_template_2[z]);
    right_obstacles_1_template_2[z].enableBody = true;
    right_obstacles_1_template_2[z].body.velocity.y = -300;
    right_obstacles_1_template_2[z].scale.setTo(0.3, 0.7);
    right_obstacles_1_template_2[z].body.immovable = true;


    right_obstacles_2_template_2[z] = game.add.sprite(x, (y + 200), "Large_obstacles");
    right_obstacles_2_template_2[z].anchor.setTo(1, 1);
    game.physics.arcade.enable(right_obstacles_2_template_2[z]);
    right_obstacles_2_template_2[z].enableBody = true;
    right_obstacles_2_template_2[z].body.velocity.y = -300;
    right_obstacles_2_template_2[z].scale.setTo(0.6, 0.7);
    right_obstacles_2_template_2[z].body.immovable = true;



    right_obstacles_3_template_2[z] = game.add.sprite(x, (y + 400), "Large_obstacles");
    right_obstacles_3_template_2[z].anchor.setTo(1, 1);
    game.physics.arcade.enable(right_obstacles_3_template_2[z]);
    right_obstacles_3_template_2[z].enableBody = true;
    right_obstacles_3_template_2[z].body.velocity.y = -300;
    right_obstacles_3_template_2[z].scale.setTo(0.3, 0.7);
    right_obstacles_3_template_2[z].body.immovable = true;

    ObstacleNumber = ObstacleNumber + 1;
};


template_construction_right[2] = function(x, y, z) {

    right_obstacles_1_template_3[z] = game.add.sprite(x, y, "Sharp_Obstacles_right");
    right_obstacles_1_template_3[z].anchor.setTo(1, 0);
    game.physics.arcade.enable(right_obstacles_1_template_3[z]);
    right_obstacles_1_template_3[z].enableBody = true;
    right_obstacles_1_template_3[z].body.velocity.y = -300;
    right_obstacles_1_template_3[z].scale.setTo(0.5, 0.75);
    right_obstacles_1_template_3[z].body.immovable = true;

    ObstacleNumber = ObstacleNumber + 1;
};

 template_construction_right[3] = function() {
    // Creates blank space
};

function GeneratingObstacles(i) {
    random3 = game.rnd.integerInRange(0, 1);
    wallGeneration();
    // random generator dictates which side of the game is safe
    RandomGeneration[random3]();
}

RandomGeneration[0] = function() {
    // Generates random sequence of obstacles from the template functions
    random = game.rnd.integerInRange(0, 2);
    random2 = game.rnd.integerInRange(5, 10);
    // right side is not safe for the block
    template_construction_left[random](leftWallsWidth, height + 200, ObstacleNumber);
    for (var i = 0; i < (random2 / 2); i++) {
      template_construction_right[2](width - leftWallsWidth, height + 200 + (100 * i), ObstacleNumber);
    }
};

RandomGeneration[1] = function() {
    // Generates random sequence of obstacles from the template functions
    random = game.rnd.integerInRange(0, 2);
    random2 = game.rnd.integerInRange(5, 10);
    template_construction_right[random](width - leftWallsWidth, height + 200, ObstacleNumber);
    for (var i = 0; i < (random2 / 2); i++) {
      template_construction_left[2](leftWallsWidth, height + 200 + (100 * i), ObstacleNumber);
    }
};

// Creates walls
function wallGeneration() {
    // Keeps the same walls on the game, prevents lag, they are repositioned when necessary
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

    wallNumber++;
}

// Kill player event handler
function playerDead() {
    player.kill();
    gameOverMessage = game.add.text(50, game.world.centerY, "Game over, press the spacebar to retry", style);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(reloadGame);
    highscoreTruth = false;
}

//Resets game
function reloadGame() {
    location.reload();
}

// Calculates and prints highScore
function highScore() {
    if (truth2) {
      if (highscoreTruth) {
        score++;
        highScoreMessage.text = "Time Alive: " + score;
      }
    }
}
