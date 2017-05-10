/**
 * Created by Spenser on 4/29/2017.
 */


var game = new Phaser.Game(600, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

// DEBUG STATE - Set this to change how verbose the console is.
// Increase the number to decrease verbosity. 0 = show all
var DEBUG_STATE = 5;

// Global Menu System
var MENUCONTROL = new MenuSystem();

// Characters
var player;
var slime;
var tallguy;
var fly;

var cursors;

// Order Groups
var slimeOrders;
var flyOrders;
var tallguyOrders;

function preload() {
    // Load in the art assets
    game.load.image('tallguy', 'assets/hill_short.png');
    game.load.image('alien', 'assets/walk0001.png');
    game.load.image('fly', 'assets/fly_normal.png');
    game.load.image('slime', 'assets/slime_normal.png');
    game.load.image('grass', 'assets/rpgTile039.png');
    game.load.image('button', 'assets/buttonLong_blue.png');
    game.load.image('tile', 'assets/panelInset_beigeLight.png');

}

function create() {
    // Create the world and fill it with grass
    game.world.resize(1200, 1200);
    game.add.tileSprite(0,0, 1200, 1200, 'grass');

    // Create the player
    player = game.add.sprite(32, 32, 'alien');
    game.physics.arcade.enable(player);

    player.body.collideWorldBounds = true;

    //Build and place the questgivers
    fly = game.add.sprite(200, 200, 'fly');
    game.physics.arcade.enable(fly);

    slime = game.add.sprite(800, 300, 'slime');
    game.physics.arcade.enable(slime);

    tallguy = game.add.sprite(600, 800, 'tallguy');
    game.physics.arcade.enable(tallguy);

    //Set Camera to Follow
    game.camera.follow(player);

    // Create the controller
    cursors = game.input.keyboard.createCursorKeys();

    // Build the Menu's
    flyOrders = new Menu(fly);
    MENUCONTROL.addMenu(flyOrders);
    slimeOrders = new Menu(slime);
    MENUCONTROL.addMenu(slimeOrders);
    tallguyOrders = new Menu(tallguy);
    MENUCONTROL.addMenu(tallguyOrders);

}

function update() {

    // Check Collisions
    game.physics.arcade.overlap(player, fly, flyCollision, null, this);
    game.physics.arcade.overlap(player, slime, slimeCollision, null, this);
    game.physics.arcade.overlap(player, tallguy, tallguyCollision, null, this);


    //Movement processing
    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x += -50;

    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x += 50;

    }
    else if (cursors.up.isDown) {
        // Move down
        player.body.velocity.y += -50;
    }
    else if (cursors.down.isDown) {
        // Move up
        player.body.velocity.y += 50;
    }
    else {
        // Stop movement if we take our hands off the keys
        player.body.velocity.y = 0;
        player.body.velocity.x = 0;
    }

    // Close Menu's if we aren't overlaping with anyone.
    if (player.body.touching['none']) {
        MENUCONTROL.overlaping = false;
    }
    if (MENUCONTROL.overlaping) MENUCONTROL.closeMenus();
}


//On collision with an object, display the proper menu
function flyCollision(player, fly) {
    if (DEBUG_STATE <= 1) console.log("FlyCollided");
    MENUCONTROL.overlaping = true;
    flyOrders.display();
}

function slimeCollision(player, slime) {
    if (DEBUG_STATE <= 1) console.log("SlimeCollided");
    MENUCONTROL.overlaping = true;
    slimeOrders.display();
}

function tallguyCollision(player, tallguy) {
    if (DEBUG_STATE <= 1) console.log("tallguyCollided");
    MENUCONTROL.overlaping = true;
    tallguyOrders.display();
}