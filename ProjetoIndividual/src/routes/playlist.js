var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/playlistController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/playlist/enviarPlaylistParaBanco", function (req, res) {
    usuarioController.cadastrar(req, res);
})

module.exports = router;