class Lobby {
    constructor(server, lobbyId) {
        this._server = server;
        this._id = lobbyId;
        this._players = [];
    }

    joinPlayer(player) {
        this.players.push(player);
    }

    removePlayer(player) {
        let indexOf = this.players.indexOf(player);
        this.players.splice(indexOf, 1);

        if(this.players.length == 0) {
            this._server.deleteLobby(this);
        }
    }

    broadcast(message) {
        broadcast(message, {});
    }

    broadcast(messa, data) {
        this.players.forEach(player => player.socket.emit(message, data));
    }

    get id() {
        return this._id;
    }

    get players() {
        return this._players;
    }
}

module.exports = Lobby;
