const { response } = require('express');
const { Game, Player } = require('../models/game');

/**
 * Configuración de la ruta principal
 */
const home = (req, res = response) => {
    res.render('index', {title: 'Juego de dados', message: 'Seleccione una opción del menú de la derecha'});
}

const createGame = (req, res = response) => {
    res.render('createGame');
}

//Se crea la partida del juego y se agregan los jugadores
const createGameForm = async (req, res = response) => {
    console.log(req.body);
    const { name1, name2, name3 } = req.body;
    const game = new Game;
    const idGame = game.id;

    const player1 = new Player({ name: name1, gameId: idGame });
    const player2 = new Player({ name: name2, gameId: idGame });
    const player3 = new Player({ name: name3, gameId: idGame });

    await game.save();
    await player1.save();
    await player2.save();
    await player3.save(); 
    

    res.render('players', { player1: player1, player2: player2, player3: player3 });
}


module.exports = { home, createGame, createGameForm }; 