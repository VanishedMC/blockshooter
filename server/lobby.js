class Lobby {
    constructor(server, lobbyId) {
        this.server = server;
        this.id = lobbyId;
        this.players = [];
    }

    joinPlayer(player) {
        this.players.push(player);
    }

    removePlayer(player) {
        let indexOf = this.players.indexOf(player);
        this.players.splice(indexOf, 1);

        if(this.players.length == 0) {
            this.server.deleteLobby(this);
        }
    }

    broadcast(message) {
        broadcast(message, {});
    }

    broadcast(message, data) {
        this.players.forEach(player => player.socket.emit(message, data));
    }
}

module.exports = Lobby;
