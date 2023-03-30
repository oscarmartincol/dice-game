const { Router } = require("express");
const { home, createGame, createGameForm } = require("../controllers/routes");

const router = Router();

router.get('/', home);

router.get('/createGame', createGame);

router.post('/createGame', createGameForm);

module.exports = router;