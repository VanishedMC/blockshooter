"use strict"

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velX = 0;
        this.velY = 0;
        this.speed = 5 / 0.016;
    }

    move(delta) {
        this.x += this.velX * delta;
        this.y += this.velY * delta;
    }

    render(ctx) {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, 64, 64);
    }
}

export default Player;
