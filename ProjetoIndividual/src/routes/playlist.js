var express = require("express");
var router = express.Router();
var playlistController = require("../controllers/playlistController");

// Rota para enviar playlist para o banco
router.post("/enviarPlaylistParaBanco", function (req, res) {
    playlistController.enviarPlaylistParaBanco(req, res);
});

// Rota para deletar uma playlist
router.delete("/deletarPlaylist/:userId/:nomePlaylist", function (req, res) {
    var userId = req.params.userId;
    var nomePlaylist = req.params.nomePlaylist;
    playlistController.deletarPlaylist(req, res, userId, nomePlaylist);
});

// Rota para obter a quantidade de playlists
router.get("/obterQuantidadePlaylists/:userId", function (req, res) {
    playlistController.obterQuantidadePlaylists(req, res);
});

router.post("/enviarResultadosQuizParaBanco", function (req, res) {
    playlistController.enviarResultadosQuizParaBanco(req, res);
});

module.exports = router;