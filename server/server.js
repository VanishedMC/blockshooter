const Lobby = require("./lobby.js");
const Player = require("./player.js");

class Server {
    constructor(io) {
        this.io = io;
        this.lobbies = []
        this.players = [];

        this.lobbies.push(new Lobby(this, this.lobbies.length));
    }

    getAvailableLobby() {
        const lobbies = this.lobbies.filter(it => it.players.length < 4);
        const oddPlayers = lobbies.filter(it => it.players.length % 2 == 1);
    
        if (oddPlayers.length > 0) {
            return oddPlayers[Math.floor(Math.random() * oddPlayers.length)];
        }
    
        if (lobbies.length > 0) {
            return lobbies[Math.floor(Math.random() * lobbies.length)];
        }
    
        const newLobby = new Lobby(this, this.lobbies.length);
        this.lobbies.push(newLobby);

        return newLobby;
    }

    /* Lobby getters / setters */
    // Find a lobby by its ID
    getLobbyById(lobbyId) {
        return this.lobbies.find(lobby => lobby.id === lobbyId);
    }

    // Find a lobby a player is in
    getLobbyByPlayer(playerId) {
        return this.lobbies.find(lobby => lobby.players.includes(playerId));
    }

    // Delete a lobby, except if its the last open lobby
    deleteLobby(lobby) {
        let indexOf = this.lobbies.indexOf(lobby);
        if(this.lobbies.length <= 1) {
            return;
        }
        this.lobbies.splice(indexOf, 1);
    }

    /* Player getters / setters */
    // Get a player from its socket object
    getPlayerById(id) {
        return this.players.find(player => player.id === id);
    }

    // Create a player object, add it to the global list
    createPlayer(socket) {
        const newPlayer = new Player(socket);
        this.players.push(newPlayer);
        return newPlayer;
    }

    // Remove a player from the lobbies its in, and the global list
    removePlayer(player) {
        this.getLobbyByPlayer(player.id).removePlayer(player.id);
        let indexOf = this.players.indexOf(player);
        this.players.splice(indexOf, 1);
    }
}

module.exports = Server;
