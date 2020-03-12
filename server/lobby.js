class Lobby {
    constructor(server, lobbyId) {
        this.server = server;
        this.id = lobbyId;
        this.players = [];
    }

    joinPlayer(id) {
        this.players.push(id);
    }

    removePlayer(id) {
        let indexOf = this.players.indexOf(id);
        this.players.splice(indexOf, 1);

        if(this.players.length == 0) {
            this.server.deleteLobby(this);
        }
    }

    syncPosition() {
        this.broadcast('players', this.players.map(id => {
            let player = this.server.getPlayerById(id);
            return {
                x: player.x,
                y: player.y
            };
         }));
    }

    broadcast(message) {
        broadcast(message, {});
    }

    broadcast(message, data) {
        this.players.forEach(id => {
            this.server.io.sockets.connected[id].emit(message, data);
        });
    }
}

module.exports = Lobby;
