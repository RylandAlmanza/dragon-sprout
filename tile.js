Tile.prototype = new Thing();
Tile.prototype.constructor = Tile;
function Tile(name, character, x, y, foreground, background, isWalkable) {
    //Tile.prototype.constructor.call(this);
    this.name = name;
    this.character = character;
    this.x = x;
    this.y = y;
    this.foreground = foreground;
    this.background = background;
    this.isWalkable = isWalkable;
};

// Grass Tile
Grass.prototype = new Tile();
Grass.prototype.constructor = Grass;
function Grass(x, y) {
    //Tile.prototype.constructor.call(this);
    this.name = 'grass';
    this.character = '.';
    this.x = x;
    this.y = y;
    this.foreground = '#0f0';
    this.background = '#000';
    this.isWalkable = true;
};

// Wheat Tile
Wheat.prototype = new Tile();
Wheat.prototype.constructor = Wheat;
function Wheat(x, y) {
    //Tile.prototype.constructor.call(this);
    this.name = 'wheat';
    this.character = '"';
    this.x = x;
    this.y = y;
    this.foreground = '#ff0'
    this.background = '#000';
    this.isWalkable = true;
};

// Tree Tile
Tree.prototype = new Tile();
Tree.prototype.constructor = Tree;
function Tree(x, y) {
    //Tile.prototype.constructor.call(this);
    this.name = 'tree';
    this.character = 'T';
    this.x = x;
    this.y = y;
    this.foreground = '#0f0';
    this.background = '#000';
    this.isWalkable = false;
};

// Wall Tile
Wall.prototype = new Tile();
Wall.prototype.constructor = Wall;
function Wall(x, y) {
    //Tile.prototype.constructor.call(this);
    this.name = 'wall';
    this.character = '#';
    this.x = x;
    this.y = y;
    this.foreground = '#fff';
    this.background = '#fff';
    this.isWalkable = false;
};

// Floor Tile
Floor.prototype = new Tile();
Floor.prototype.constructor = Floor;
function Floor(x, y) {
    //Tile.prototype.constructor.call(this);
    this.name = 'floor';
    this.character = '.';
    this.x = x;
    this.y = y;
    this.foreground = '#fff';
    this.background = '#000';
    this.isWalkable = true;
};

// Door Tile
Door.prototype = new Tile();
Door.prototype.constructor = Door;
function Door(x, y) {
    //Tile.prototype.constructor.call(this);
    this.name = 'door';
    this.character = '+';
    this.x = x;
    this.y = y;
    this.foreground = '#0ff';
    this.background = '#000';
    this.isWalkable = true;
};