const Lobby = require("./lobby.js");
const Player = require("./player.js");

module.exports = class Server {
    constructor() {
        this._lobbies = []
        this._players = [];

        let newLobby = new Lobby(this, this.lobbies.length);
        this.lobbies.push(newLobby);
    }

    getAvailableLobby() {
        let lobby = this.lobbies.slice().filter((lobby) => lobby.players.length < 4)
        .sort(() => Math.random() - 0.5)
        .sort((a, b) => {
            let aEven = a.players.length % 2 == 0;
            let bEven = b.players.length % 2 == 0;
            return bEven - aEven;
        })[0];

        if(!lobby) {
            let newLobby = new Lobby(this, this.lobbies.length);
            this.lobbies.push(newLobby);
            return newLobby;
        } else {
            return lobby;
        }
    }

    // Find a lobby by its ID
    getLobbyById(id) {
        for (let i = 0; i < this.lobbies.length; i++) {
            if (this.lobbies[i].id === id) {
                return this.lobbies[i];
            }
        }

        return null;
    }

    // Find a lobby a player is in
    getLobbyByPlayer(player) {
        for (let i = 0; i < this.lobbies.length; i++) {
            if (this.lobbies[i].players.includes(player)) {
                return this.lobbies[i];
            }
        }

        return null;
    }

    // Delete a lobby, except if its the last open lobby
    deleteLobby(lobby) {
        let indexOf = this.lobbies.indexOf(lobby);
        if(this.lobbies.length <= 0) {
            return;
        }
        this.lobbies.splice(indexOf, 1);
    }

    // Create a player object, add it to the global list
    createPlayer(socket) {
        let newPlayer = new Player(socket);
        this.players.push(newPlayer);
        return newPlayer;
    }

    // Get a player from its socket object
    getPlayerBySocket(socket) {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].socket === socket) {
                return this.players[i];
            }
        }

        return null;
    }

    // Get all lobbies
    get lobbies() {
        return this._lobbies;
    }

    // Get all players
    get players() {
        return this._players;
    }
}
