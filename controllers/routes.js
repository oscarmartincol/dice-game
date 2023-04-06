const { response } = require('express');
const { Game, Player } = require('../models/game');

/**
 * Configuración de la ruta principal
 */
const home = (req, res = response) => {
    res.render('index', {title: 'Juego de dados', message: 'Oprima el siguiente botón para crear una nueva partida'});
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
    

    res.render('players', { idGame: idGame, name1: player1.name, name2: player2.name,
         name3: player3.name });
}

//Almacena el valor de la apuesta y inicia el juego.
const startGame = async (req, res = response) => {
    const { bet } = req.body;
    const id = req.params.id;
    const game = await Game.findOne({ id });
    console.log(game.inProgress);
    console.log(id);

   
    game.inProgress = true;
    game.bet = bet;

    await game.save();
    //Buscar los jugadores que participan en la partida
    const players = await Player.find({ id });

    //Obtiene un puntaje por cada jugador al lanzar dos dados
    for (let player of players) {
        let score = 0;
        const dice1 = Math.floor((Math.random() * 6) + 1);
        const dice2 = Math.floor((Math.random() * 6) + 1);
        const result = dice1 + dice2;
    
        score += result;
    
        //Guardar el puntaje de los jugadores
        player.score = score;
        await player.save();
            
    }
    
    res.render('lobby', { idGame: id });    

}

const gameStatus = async (req, res = response) => {
    const  idGame  = req.params.idGame;
    console.log(idGame);

    const game = await Game.findOne( {idGame} );
    const winner = await Player.findOne( { idGame } ).sort({ score: -1 });

    res.render('gameState');
}


module.exports = { home, createGame, createGameForm, gameStatus, startGame };