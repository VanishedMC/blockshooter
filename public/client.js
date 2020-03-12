"use strict"

import Canvas from "./Canvas.js";

class Game {
    constructor() {
        this.screen = new Canvas();
        this.ctx = this.screen.ctx;
        this.width = this.screen.width;
        this.height = this.screen.height;

        this.running = true;
        this.lastFrame = 0;
        this.latency = 0;
        this.fps = 0;

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
        let text = `${this.fps} fps, ${this.latency}ms`;
        this.ctx.fillText(text, this.width - 10 - this.ctx.measureText(text).width, this.height-10);

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

socket.on('pong', (ms) => {
    gameObj.latency = ms;
});