class Player {
    constructor(socket) {
        this.socket = socket;
        this.x = 0;
        this.y = 0;
        this.velX = 0;
        this.velY = 0;
    }

    move() {
        x += velX;
        y += velY;
    }
}

module.exports = Player;
