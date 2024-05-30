var express = require("express");
var router = express.Router();

var playlistController = require("../controllers/playlistController");

// Rota para enviar playlist para o banco
router.post("/enviarPlaylistParaBanco", function (req, res) {
    playlistController.enviarPlaylistParaBanco(req, res);
});

// Rota para deletar uma playlist
router.delete("/deletarPlaylist/:nomePlaylist", function (req, res) {
    // Obtenha o nome da playlist a ser deletada dos parâmetros da solicitação
    var nomePlaylist = req.params.nomePlaylist;

    // Adicione aqui a lógica para deletar a playlist com o nome fornecido
    playlistController.deletarPlaylist(req, res, nomePlaylist);
});

module.exports = router;