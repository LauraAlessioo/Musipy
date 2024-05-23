const playlistModel = require('../models/playlistModel');

function enviarPlaylistParaBanco(req, res) {
    // Recupera o nome da playlist do corpo da requisição
    const { nomePlaylist } = req.body;

    // Valida se o nome da playlist está definido
    if (nomePlaylist === undefined) {
        return res.status(400).send("O nome da playlist está undefined!");
    }

    // Chama a função do modelo para enviar a playlist para o banco de dados
    playlistModel.enviarPlaylistParaBanco(nomePlaylist)
        .then(data => {
            console.log('Playlist enviada com sucesso:', data);
            res.json({ message: 'Playlist enviada com sucesso!' });
        })
        .catch(error => {
            console.error('Erro ao enviar a playlist:', error);
            res.status(500).json({ error: 'Erro ao enviar a playlist' });
        });
}

module.exports = {
    enviarPlaylistParaBanco
};
