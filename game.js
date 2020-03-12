require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, {pingInterval: 1000});
const Player = require("./server/player.js");
const Lobby = require("./server/lobby.js");
const Server = require("./server/server.js");
const server = new Server(io);

const PORT = process.env.PORT;

io.on('connection', (socket) => {
    server.createPlayer(socket);
    server.getAvailableLobby().joinPlayer(socket.id);

    socket.on('position', (position) => {
        server.getPlayerById(socket.id).setPosition(position);
    });

    socket.on('disconnect', () => {
        let player = server.getPlayerById(socket.id);
        server.removePlayer(player);
    });
});

const loop = () => {
    server.lobbies.forEach(lobby => lobby.syncPosition());

    setTimeout(loop);
}
loop();

app.use('/', express.static(`${__dirname}/public`));
http.listen(PORT)
console.log(`Listening on port ${PORT}`);
