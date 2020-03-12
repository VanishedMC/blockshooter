class Player {
    constructor(socket) {
        this.id = socket.id;
        this.x = 0;
        this.y = 0;
        this.velX = 0;
        this.velY = 0;
    }

    move() {
        x += velX;
        y += velY;
    }

    setPosition(position) {
        this.x = position.x;
        this.y = position.y;
    }
}

module.exports = Player;
