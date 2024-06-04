const playlistModel = require('../models/playlistModel');

const enviarPlaylistParaBanco = (req, res) => {
    const { nomePlaylist, userId } = req.body;

    if (!nomePlaylist || !userId) {
        return res.status(400).send("O nome da playlist ou o ID do usuário está indefinido!");
    }

    playlistModel.adicionarPlaylist(nomePlaylist, userId)
        .then(data => {
            console.log('Playlist enviada com sucesso:', data);
            res.json({ message: 'Playlist enviada com sucesso!' });
        })
        .catch(error => {
            console.error('Erro ao enviar a playlist:', error);
            res.status(500).json({ error: 'Erro ao enviar a playlist' });
        });
};

function deletarPlaylist(req, res, userId, nomePlaylist) {
    playlistModel.deletarPlaylist(userId, nomePlaylist)
        .then(data => {
            console.log('Playlist deletada com sucesso:', data);
            res.json({ message: 'Playlist deletada com sucesso!' });
        })
        .catch(error => {
            console.error('Erro ao deletar a playlist:', error);
            res.status(500).json({ error: 'Erro ao deletar a playlist' });
        });
}

function obterQuantidadePlaylists(req, res) {
    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).send("O ID do usuário está indefinido!");
    }

    playlistModel.obterQuantidadePlaylists(userId)
        .then(data => {
            if (data && data.length > 0 && data[0].quantidade_playlists !== undefined) {
                console.log("Quantidade de playlists:", data[0].quantidade_playlists);
                res.json({ quantidadePlaylists: data[0].quantidade_playlists });
            } else {
                console.error("Erro ao obter a quantidade de playlists:", data);
                res.status(500).json({ error: 'Erro ao obter a quantidade de playlists' });
            }
        })
        .catch(error => {
            console.error("Erro ao obter a quantidade de playlists:", error);
            res.status(500).json({ error: 'Erro ao obter a quantidade de playlists' });
        });
}

function enviarResultadosQuizParaBanco(req, res) {
    const { acertos, totalQuestoes } = req.body;

    if (acertos === undefined || totalQuestoes === undefined) {
        return res.status(400).send("Os resultados do quiz estão undefined!");
    }

    playlistModel.adicionarResultadosQuiz(acertos, totalQuestoes)
        .then(data => {
            console.log('Resultados do quiz enviados com sucesso:', data);
            res.json({ message: 'Resultados do quiz enviados com sucesso!' });
        })
        .catch(error => {
            console.error('Erro ao enviar os resultados do quiz:', error);
            res.status(500).json({ error: 'Erro ao enviar os resultados do quiz' });
        });
}


module.exports = {
    enviarPlaylistParaBanco,
    deletarPlaylist,
    obterQuantidadePlaylists,
    enviarResultadosQuizParaBanco
};