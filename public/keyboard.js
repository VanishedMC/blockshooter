class Keyboard {
    constructor(game) {
        this.player = game.player;

        this.keys = {
            up: false, // 87 38
            down: false, // 83 40
            left: false, // 65 37
            right: false, // 68 39
        }

        this.codes = [
            87, 38,
            83, 40,
            65, 37,
            68, 39
        ];

        document.addEventListener("keyup", this.keyUpHandler);
        document.addEventListener("keydown", this.keyDownHandler);
    }

    keyDownHandler = (e) => {
        if(this.codes.includes(e.keyCode)) {
            e.preventDefault();
        }

        if(e.keyCode === 87 || e.keyCode === 38) {
            this.keys.up = true;
            this.player.velY = -this.player.speed;
        }

        if(e.keyCode === 83 || e.keyCode === 40) {
            this.keys.down = true;
            this.player.velY = this.player.speed;
        }

        if(e.keyCode === 65 || e.keyCode === 37) {
            this.keys.left = true;
            this.player.velX = -this.player.speed;
        }

        if(e.keyCode === 68 || e.keyCode === 39) {
            this.keys.right = true;
            this.player.velX = this.player.speed;
        }
    }

    keyUpHandler = (e) => {
        if(this.codes.includes(e.keyCode)) {
            e.preventDefault();
        }

        if(e.keyCode === 87 || e.keyCode === 38) {
            this.keys.up = false;
            if(this.keys.down) {
                this.player.velY = this.player.speed;
            }
        }

        if(e.keyCode === 83 || e.keyCode === 40) {
            this.keys.down = false;
            if(this.keys.up) {
                this.player.velY = -this.player.speed;
            }
        }

        if(e.keyCode === 65 || e.keyCode === 37) {
            this.keys.left = false;
            if(this.keys.right) {
                this.player.velX = this.player.speed;
            }
        }

        if(e.keyCode === 68 || e.keyCode === 39) {
            this.keys.right = false;
            if(this.keys.left) {
                this.player.velX = -this.player.speed;
            }
        }

        if(!this.keys.up && !this.keys.down) {
            this.player.velY = 0;
        }

        if(!this.keys.left && !this.keys.right) {
            this.player.velX = 0;
        }
    }
}

export default Keyboard;