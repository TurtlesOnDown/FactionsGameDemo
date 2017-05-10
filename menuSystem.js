/**
 * Created by Spenser on 4/30/2017.
 */

//Control unit over all smaller menu's
function MenuSystem() {
    this.overlaping = false;

    this.menus = [];
}

// Go through all the menus and hide them
MenuSystem.prototype.closeMenus = function() {
    for (var i = 0; i < this.menus.length; ++i) {
        this.menus[i].hide();
    }
};

//Add a new menu to the system
MenuSystem.prototype.addMenu = function(menu) {
    this.menus.push(menu);
};


// The pop up menu which is used by the quest givers
// Owner is the sprite that the menu should appear above
function Menu(owner) {
    this.owner = owner;
    this.open = false;

    this.menu = game.add.group();

    // Create the parchment
    this.menu.create(owner.x, owner.y, 'tile').scale.setTo(3,3);
    this.menu.visible = false;

    // Create the button backdrop
    for (var i = 0; i < 5; ++i) {
        this.menu.create(this.owner.x + 50, this.owner.y + 15 + (i * 50), 'button');
    }

    // Array of options so we can update them later
    this.options = [];

    // Creates a text, sets the input value, and then pushes it into the group
    for (var i = 0; i < 5; ++i) {
        var newText = game.add.text(this.owner.x + 60, this.owner.y + 20 + (i * 50), "Option" + i, {}, this.menu);
        newText.inputEnabled = true;
        newText.events.onInputDown.add(function() { if (DEBUG_STATE <= 5) console.log("Default Input Fired");}, game);
        this.options.push(newText);
    }

    console.log(this.options);
}

// Set the menu to display itself
Menu.prototype.display = function() {
    this.menu.visible = true;
    if (DEBUG_STATE <= 4) console.log("Menu.display called");
};

// Hides the menu
Menu.prototype.hide = function() {
    this.menu.visible = false;
    if (DEBUG_STATE <= 4) console.log("Menu.hide called");
};

// Takes in the new Ensemble commands and command names and updates the options list with it
// Requires an array of strings and an array of commands
Menu.prototype.refreshOptions = function(strings, commands) {

    // Cleans out the options, adds in the new ones and then sets all the names
    for (var i = 0; i < this.options.length; ++i) {
        this.options[i].events.onInputDown.dispose();
        newText.events.onInputDown.add(commands[i], game);
        this.options[i].setText(strings[i], true);
    }
};