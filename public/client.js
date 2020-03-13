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

        this.player = new Player(0, 0);
        this.keyboard = new Keyboard(this);

        this.network();

        requestAnimationFrame(this.render);
        setInterval(this.tick, 1000/120);
        return this;
    }

    network() {
        this.socket = io();
        this.socketId = null;

        this.socket.on('connect', () => {
            this.socketId = this.socket.io.engine.id; 
        
            this.socket.on('players', (players) => {
                this.players = players;
            })

            this.socket.on('syncPosition', (position) => {
                this.player.x = position.x;
                this.player.y = position.y;
            });
            
            this.socket.on('disconnect', () => {
                this.running = false;
            });
            
            this.socket.on('reconnect', () => {
                this.running = true;
            });
            
            this.socket.on('pong', (ms) => {
                this.latency = ms;
            });
        });
    }

    render = (frameTime) => {
        // Clear screen
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Calculate fps
        let delta = (frameTime - this.lastFrame) / 1000;
        this.lastFrame = frameTime;
        this.fps = 1 / delta;
        this.fps = Math.round(this.fps);

        // Render fps ans ping
        this.ctx.fillStyle = "Black";
        let text = `${this.fps} fps, ${this.latency}ms`;
        this.ctx.fillText(text, this.width - 10 - this.ctx.measureText(text).width, this.height-10);

        // Render players
        this.player.render(this.ctx);
        this.players.forEach(player => {
            if(player.id === this.socketId) return;

            this.ctx.fillStyle = "red";
            this.ctx.fillRect(player.x, player.y, 64, 64);
        });
        requestAnimationFrame(this.render);
    }

    tick = () => {
        this.player.move();
        this.socket.emit('position', {x: this.player.x, y: this.player.y});
    }
}

// FOR DEVELOPING / TESTING ONLY
window.game = new Game();
