"use strict"

import Canvas from "./canvas.js";
import Player from "./player.js";
import Keyboard from "./keyboard.js";

class Game {
    constructor() {
        this.screen = new Canvas();
        this.ctx = this.screen.ctx;
        this.width = this.screen.width;
        this.height = this.screen.height;

        this.players = [];

        this.running = true;
        this.lastFrame = 0;
        this.latency = 0;
        this.fps = 0;

        this.player = new Player(10, 10);
        this.keyboard = new Keyboard(this);

        this.socket = io();
        this.network();

        requestAnimationFrame(this.loop);
        return this;
    }

    network() {
        this.socket.on('players', (players) => {
            this.players = players;
        })
        
        this.socket.on('disconnect', () => {
            this.running = false;
        });
        
        this.socket.on('reconnect', () => {
            this.running = true;
        });
        
        this.socket.on('pong', (ms) => {
            this.latency = ms;
        });
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
         * Rendering
         */
        this.ctx.fillStyle = "Black";
        let text = `${this.fps} fps, ${this.latency}ms`;
        this.ctx.fillText(text, this.width - 10 - this.ctx.measureText(text).width, this.height-10);

        this.players.forEach(player => {
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(player.x, player.y, 64, 64);
        });

        /* 
         * Ticking
         */
        this.player.move();
        this.socket.emit('position', {x: this.player.x, y: this.player.y});

        requestAnimationFrame(this.loop);
    }
}

new Game();
