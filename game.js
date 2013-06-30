var game_width = 80;
var game_height = 22;

var startgame = function() {
    var seed = Math.seedrandom();
    console.log("Seed: " + seed);
    var display = new ROT.Display({width: game_width, height: game_height});
    //display.setOptions({fps: 60});
    document.body.appendChild(display.getContainer());
    
    var dungeon = new Dungeon(game_width, game_height);
    for (var y = 0; y < dungeon.height; y++) {
        for (var x = 0; x < dungeon.width; x++) {
            if (dungeon.tiles[y][x] != null) {
                display.draw(x, y, dungeon.tiles[y][x].character, dungeon.tiles[y][x].foreground, dungeon.tiles[y][x].background);
            }
        }
    }
    
    var player = new Player('player', dungeon.player_x, dungeon.player_y);
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
            display.draw(old_x, old_y, dungeon.tiles[old_y][old_x].character, dungeon.tiles[old_y][old_x].foreground, dungeon.tiles[old_y][old_x].background);
            display.draw(player.x, player.y, player.character, player.foreground);
        } else {
            player.x = old_x;
            player.y = old_y;
        }
   };
};
