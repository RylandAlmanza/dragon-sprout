var MAX_ROOM_SIZE = 11;
var MIN_ROOM_SIZE = 5;
var MAX_ROOMS = 30;
var MULT = [
               [1,  0,  0, -1, -1,  0,  0,  1],
               [0,  1, -1,  0,  0, -1,  1,  0],
               [0,  1,  1,  0,  0, -1, -1,  0],
               [1,  0,  0,  1, -1,  0,  0, -1]
           ];

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

    this.playerPos = this.getRandomTile('floor');
    this.FOV(this.playerPos.x, this.playerPos.y, 15);
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

Dungeon.prototype.getRandomTile = function(name) {
    var found = false;
    var x, y;
    while (found === false) {
        x = Math.floor(Math.random() * this.width);
        y = Math.floor(Math.random() * this.height);
        if (this.tiles[y][x].name == name) {
            found = true;
        }
    }
    return {x: x, y: y};
}

Dungeon.prototype.castLight = function(cx, cy, row, start, end, radius, xx, xy, yx, yy, id) {
    if (start < end) return;
    var radius_squared = radius*radius;
    for (var j = row; j < radius + 1; j++) {
        var dx = -j - 1;
        var dy = -j;
        var blocked = false;
        while (dx <= 0) {
            dx += 1;
            var X = cx + dx * xx + dy * xy;
            var Y = cy + dx * yx + dy * yy;
            var l_slope = (dx - 0.5) / (dy + 0.5);
            var r_slope = (dx + 0.5) / (dy - 0.5);
            if (start < r_slope) {
                continue;
            } else if (end > l_slope) {
                break;
            } else {
                if (dx * dx + dy * dy < radius_squared) {
                    this.lit_tiles.push(this.tiles[Y][X]);
                }
                if (blocked) {
                    if (this.tiles[Y][X].isWalkable === false) {
                        var new_start = r_slope;
                        continue;
                    } else {
                        blocked = false;
                        start = new_start;
                    }
                } else {
                    if (this.tiles[Y][X].isWalkable === false &&
                        j < radius) {
                        blocked = true;
                        this.castLight(cx, cy, j + 1, start, l_slope, radius, xx, xy, yx, yy, id + 1);
                        var new_start = r_slope;
                    }
                }
            }
        }

        if (blocked) break;
    }
}
        
Dungeon.prototype.FOV = function(x, y, radius) {
    this.lit_tiles = [];
    for (var oct = 0; oct < 8; oct++) {
        this.castLight(x, y, 1, 1.0, 0.0, radius, MULT[0][oct], MULT[1][oct], MULT[2][oct], MULT[3][oct], 0);
    }
}
