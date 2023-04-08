const { Router } = require("express");
const { home, createGame, createGameForm, startGame, gameStatus, winner } = require("../controllers/routes");

const router = Router();

router.get('/', home);

router.get('/createGame', createGame);

router.post('/createGame', createGameForm);

router.post('/startGame', startGame);

router.get('/game/:idGame', gameStatus);

router.get('/game/:idGame/winner', winner);

module.exports = router;