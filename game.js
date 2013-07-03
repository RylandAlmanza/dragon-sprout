var game_width = 81;
var game_height = 21;

var startgame = function() {
    var seed = Math.seedrandom();
    console.log("Seed: " + seed);
    var display = new ROT.Display({width: game_width, height: game_height});
    //display.setOptions({fps: 60});
    document.body.appendChild(display.getContainer());
    
    var dungeon = new Dungeon(game_width, game_height);
    /*for (var y = 0; y < dungeon.height; y++) {
        for (var x = 0; x < dungeon.width; x++) {
            if (dungeon.tiles[y][x] != null) {
                display.draw(x, y, dungeon.tiles[y][x].character, dungeon.tiles[y][x].foreground, dungeon.tiles[y][x].background);
            }
        }
    }*/
    for (var i = 0; i < dungeon.lit_tiles.length; i++) {
        var x = dungeon.lit_tiles[i].x;
        var y = dungeon.lit_tiles[i].y;
        var character = dungeon.lit_tiles[i].character;
        var foreground = dungeon.lit_tiles[i].foreground;
        var background = dungeon.lit_tiles[i].background;
        display.draw(x, y, character, foreground, background);
    }
    
    var player = new Player('player', dungeon.playerPos.x, dungeon.playerPos.y);
    display.draw(player.x, player.y, player.character, player.foreground);
    
    document.onkeydown = function(evt) {
        var old_x = player.x;
        var old_y = player.y;
        var charCode = evt.which;
        var charStr = String.fromCharCode(charCode);
        if (charStr == 'H') {
            player.x -= 1;
        } else if (charStr == 'J') {
            player.y += 1;
        } else if (charStr == 'K') {
            player.y -= 1;
        } else if (charStr == 'L') {
            player.x += 1;
        } else if (charStr == 'Y') {
            player.x -= 1;
            player.y -= 1;
        } else if (charStr == 'U') {
            player.x += 1;
            player.y -= 1;
        } else if (charStr == 'B') {
            player.x -= 1;
            player.y += 1;
        } else if (charStr == 'N') {
            player.x += 1;
            player.y += 1;
        } else {
            return;
        }
        if (dungeon.tiles[player.y][player.x].isWalkable) {
            for (var y = 0; y < game_height; y++) {
                for (var x = 0; x < game_width; x++) {
                    var background = BLACK;
                    if (dungeon.tiles[y][x].name == 'wall') {
                        background = GRAY;
                    }
                    if (display._data.hasOwnProperty(x+','+y))
                    display.draw(x, y, display._data[x+','+y][2], GRAY, background);
                }
            }
            display.draw(old_x, old_y, dungeon.tiles[old_y][old_x].character, dungeon.tiles[old_y][old_x].foreground, dungeon.tiles[old_y][old_x].background);
            display.draw(player.x, player.y, player.character, player.foreground);
            dungeon.FOV(player.x, player.y, 15);
            for (var i = 0; i < dungeon.lit_tiles.length; i++) {
                var x = dungeon.lit_tiles[i].x;
                var y = dungeon.lit_tiles[i].y;
                var character = dungeon.lit_tiles[i].character;
                var foreground = dungeon.lit_tiles[i].foreground;
                var background = dungeon.lit_tiles[i].background;
                display.draw(x, y, character, foreground, background);
            }

        } else {
            player.x = old_x;
            player.y = old_y;
        }
   };
};
