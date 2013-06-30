Being.prototype = new Thing();
Being.prototype.constructor = Being;
function Being(name, character, x, y, foreground, background) {
    //Tile.prototype.constructor.call(this);
    this.name = name;
    this.character = character;
    this.x = x;
    this.y = y;
    this.foreground = foreground;
    this.background = 'clear';
};

// Player
Player.prototype = new Being();
Player.prototype.constructor = Player;
function Player(name, x, y) {
    //Tile.prototype.constructor.call(this);
    this.name = name;
    this.character = "@";
    this.x = x;
    this.y = y;
    this.foreground = '#fff';
    this.background = 'clear';
};

/*Player.prototype.hasItemType = function(name) {
    for (var i = 0; i < this.inventory.length; i++) {
        if (this.inventory[i].type == "axe") {
            return true;
        }
    }
    return false;
}*/