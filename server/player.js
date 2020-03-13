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
        let xDiff = this.x - position.x;
        let yDiff = this.y - position.y;
        
        xDiff = xDiff < 0 ? -xDiff : xDiff;
        yDiff = yDiff < 0 ? -yDiff : yDiff;

        // if(xDiff > 5 || yDiff > 5) {
        //     return "diffTooLarge";
        // }

        this.x = position.x;
        this.y = position.y;
    }
}

module.exports = Player;
