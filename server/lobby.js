module.exports = class Lobby {
    constructor(server, lobbyId) {
        this.server = server;
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
            this.server.deleteLobby(this);
        }
    }

    broadcast(message) {
        broadcast(message, {});
    }

    broadcast(messa, data) {
        // TODO
        console.log(`sending message ${message} with data ${data} to ${this.players}`);
    }

    get id() {
        return this._id;
    }

    get players() {
        return this._players;
    }
}