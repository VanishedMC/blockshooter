module.exports = class Player {
    constructor(socket) {
        this._socket = socket;
        this._x = 0;
        this._y = 0;
        this._velX = 0;
        this._velY = 0;
    }

    move() {
        x += velX;
        y += velY;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get velX() {
        return this._velX;
    }

    get velY() {
        return this._velY;
    }

    get socket() {
        return this._socket;
    }
}