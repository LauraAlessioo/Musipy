var express = require("express");
var router = express.Router();

var playlistController = require("../controllers/playlistController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/enviarPlaylistParaBanco", function (req, res) {
    playlistController.enviarPlaylistParaBanco(req, res);
})

module.exports = router;