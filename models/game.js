const mongoose = require('mongoose');

/**
 * Archivo que contiene los modelos del juego y el jugador
 */

const gameSchema = new mongoose.Schema({
    inProgress: {
        type: Boolean,
        default: false
    },
    bet: {
        type: Number,
        default: 0
    }
});

/**
 * Esquema que representa un jugador
 */
const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },

    score: {
        type: Number,
        default: 0
    }
});

const Game = mongoose.model( 'Game', gameSchema);
const Player = mongoose.model('Player', playerSchema);

module.exports = { Game, Player };