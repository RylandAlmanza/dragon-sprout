var MAX_ROOM_SIZE = 11;
var MIN_ROOM_SIZE = 5;
var MAX_ROOMS = 30;

function Dungeon(width, height) {
    this.width = width;
    this.height = height;
    this.tiles = [];
    for (var y = 0; y < this.height; y++) {
        this.tiles.push([]);
        for (var x = 0; x < this.width; x++) {
            this.tiles[y].push(new Wall(x, y));
        }
    }
    
    var rooms = []
    var number_of_rooms = 0;
    
    for (var i = 0; i < MAX_ROOMS; i++) {
        var room_width = (Math.floor(Math.random() * 4) * 2) + 5;
        var room_height = (Math.floor(Math.random() * 4) * 2) + 5;
        var half_width = Math.floor(room_width / 2);
        var half_height = Math.floor(room_height / 2);
        
        var min_x = 1 + half_width;
        var min_y = 1 + half_height;
        var max_x = this.width - half_width - 1;
        var max_y = this.height - half_height - 1;
        
        var boundry_width = max_x - min_x;
        var boundry_height = max_y - min_y;
        
        var room_x = Math.floor(Math.random() * boundry_width) + min_x;
        var room_y = Math.floor(Math.random() * boundry_height) + min_y;

        var room = new Room(room_x, room_y, room_width, room_height);

        var failed = false;
        for (var j = 0; j < rooms.length; j++) {
            if (room.intersects(rooms[j])) {
               failed = true;
               break;
            }
        }

        if (failed == false) {
            this.createRoom(room);

            if (number_of_rooms === 0) {
                this.player_x = room_x;
                this.player_y = room_y;
            } else {
                var last_x = rooms[number_of_rooms - 1].x;
                var last_y = rooms[number_of_rooms - 1].y;
                if (Math.floor(Math.random() * 2)) {
                    this.createHorizontalTunnel(last_x, room_x, last_y);
                    this.createVerticalTunnel(last_y, room_y, room_x);
                } else {
                    this.createVerticalTunnel(last_y, room_y, last_x);
                    this.createHorizontalTunnel(last_x, room_x, room_y);
                }
            }
            rooms.push(room);
            number_of_rooms += 1;
        }
    }
    //this.cleanWalls();
}

Dungeon.prototype.createRoom = function(room) {
    for (var y = room.rtop; y < room.bottom + 1; y++) {
        for (var x = room.left; x < room.right + 1; x++) {
            this.tiles[y][x] = new Floor(x, y);
        }
    }
}

Dungeon.prototype.createHorizontalTunnel = function(x1, x2, y) {
    for (var x = Math.min(x1, x2); x < Math.max(x1, x2) + 1; x++) {
        this.tiles[y][x] = new Floor(x, y);
    }
}

Dungeon.prototype.createVerticalTunnel = function(y1, y2, x) {
    for (var y = Math.min(y1, y2); y < Math.max(y1, y2) + 1; y++) {
        this.tiles[y][x] = new Floor(x, y);
    }
}

Dungeon.prototype.cleanWalls = function() {
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            if (this.tiles[y][x].name == 'wall') {
                var is_needed = false;
                for (var j = y - 1; j < y + 2; j++) {
                    for (var i = x - 1; i < x + 2; i++) {
                        if (i < 0 || j < 0 || i == this.width || j == this.height) break;
                        if (this.tiles[j][i] == null) break;
                        if (this.tiles[j][i].name == 'floor') {
                            is_needed = true;
                            break;
                        }
                    }
                    if (is_needed) {
                        break;
                    }
                }
                if (is_needed === false) {
                    this.tiles[y][x] = null;
                }
            }
        }
    }
}
