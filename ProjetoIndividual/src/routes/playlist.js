var express = require("express");
var router = express.Router();
var playlistController = require("../controllers/playlistController");

// Rota para enviar playlist para o banco
router.post("/enviarPlaylistParaBanco", function (req, res) {
    playlistController.enviarPlaylistParaBanco(req, res);
});

// Rota para deletar uma playlist
router.delete("/deletarPlaylist/:nomePlaylist", function (req, res) {
    var nomePlaylist = req.params.nomePlaylist;
    playlistController.deletarPlaylist(req, res, nomePlaylist);
});

// Rota para obter a quantidade de playlists
router.get("/obterQuantidadePlaylists", function (req, res) {
    playlistController.obterQuantidadePlaylists(req, res);
});

router.post("/enviarResultadosQuizParaBanco", function (req, res) {
    playlistController.enviarResultadosQuizParaBanco(req, res);
});

module.exports = router;