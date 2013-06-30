function Room(center_x, center_y, width, height) {
    if ((width % 2 && height % 2) != true) {
        console.log(width + ' is not odd!');
        return null;
    }
    this.width = width;
    this.height = height;
    this.x = center_x;
    this.y = center_y;
    this.half_width = Math.floor(width / 2);
    this.half_height = Math.floor(height / 2);
    this.left = this.x - this.half_width;
    this.right = this.x + this.half_width;
    this.rtop = this.y - this.half_height;
    this.bottom = this.y + this.half_height;
}

Room.prototype.intersects = function(room2) {
    return (this.left <= room2.right && this.right >= room2.left &&
                this.rtop <= room2.bottom && this.bottom >= room2.rtop);
}
