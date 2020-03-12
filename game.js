require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, {pingInterval: 1000});
const Player = require("./server/player.js");
const Lobby = require("./server/lobby.js");
const Server = require("./server/server.js");
const server = new Server();

const PORT = process.env.PORT;

io.on('connection', (socket) => {
    let player = server.createPlayer(socket);
    server.getAvailableLobby().joinPlayer(player);
    
    console.clear();
    console.log(server.lobbies);

    socket.on('disconnect', () => {
        let player = server.getPlayerBySocket(socket);
        server.removePlayer(player);

        console.clear();
        console.log(server.lobbies);
    });
});

app.use('/', express.static(`${__dirname}/public`));
http.listen(PORT)
console.log(`Listening on port ${PORT}`);
