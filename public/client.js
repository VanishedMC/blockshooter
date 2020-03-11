"use strict"

import Canvas from "./Canvas.js";

class Game {
    /* 
     * Game objects / variables 
     */
    screen = null;
    ctx = null;
    width = null;
    height = null;

    lastFrame = 0;
    fps = 0;
    running = true;

    constructor() {
        this.screen = new Canvas();
        this.ctx = this.screen.ctx;
        this.width = this.screen.width;
        this.height = this.screen.height;

        console.log("constructor");

        requestAnimationFrame(this.loop);
        return this;
    }


    loop = (frameTime) => {
        if(!this.running) {
            requestAnimationFrame(this.loop);
            return;
        }
        /* 
         * Frame time and fps management
         */
        let delta = frameTime - this.lastFrame;
        this.lastFrame = frameTime;
        this.fps = 1 / (delta / 1000);
        this.fps = Math.round((this.fps + Number.EPSILON) * 100) / 100
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        /* 
         * Main render loop
         */
        this.ctx.fillStyle = "Black";
        this.ctx.fillText(`${this.fps} fps`, this.width-50, this.height-10);

        requestAnimationFrame(this.loop);
    }
}

const gameObj = new Game();
const socket = io();

socket.on('disconnect', () => {
    gameObj.running = false;
});

socket.on('reconnect', () => {
    gameObj.running = true;
});
