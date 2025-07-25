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
    const { acertos, totalQuestoes, userId} = req.body;

    if (acertos === undefined || totalQuestoes === undefined || userId === undefined) {
        return res.status(400).send("Os resultados do quiz estão undefined!");
    }

    playlistModel.adicionarResultadosQuiz(acertos, totalQuestoes, userId)
        .then(data => {
            console.log('Resultados do quiz enviados com sucesso:', data);
            res.json({ message: 'Resultados do quiz enviados com sucesso!' });
        })
        .catch(error => {
            console.error('Erro ao enviar os resultados do quiz:', error);
            res.status(500).json({ error: 'Erro ao enviar os resultados do quiz' });
        });
}

function enviarResultadosQuizParaBanco2(req, res) {
    const { acertos, totalQuestoes, userId } = req.body;

    if (acertos === undefined || totalQuestoes === undefined || userId === undefined) {
        return res.status(400).send("Os resultados do quiz estão undefined!");
    }

    playlistModel.adicionarResultadosQuiz2(acertos, totalQuestoes, userId)
        .then(data => {
            console.log('Resultados do quiz enviados com sucesso:', data);
            res.json({ message: 'Resultados do quiz enviados com sucesso!' });
        })
        .catch(error => {
            console.error('Erro ao enviar os resultados do quiz:', error);
            res.status(500).json({ error: 'Erro ao enviar os resultados do quiz' });
        });
}

function enviarResultadosQuizParaBanco3(req, res) {
    const { acertos, totalQuestoes, userId } = req.body;

    if (acertos === undefined || totalQuestoes === undefined || userId === undefined) {
        return res.status(400).send("Os resultados do quiz estão undefined!");
    }

    playlistModel.adicionarResultadosQuiz3(acertos, totalQuestoes, userId)
        .then(data => {
            console.log('Resultados do quiz enviados com sucesso:', data);
            res.json({ message: 'Resultados do quiz enviados com sucesso!' });
        })
        .catch(error => {
            console.error('Erro ao enviar os resultados do quiz:', error);
            res.status(500).json({ error: 'Erro ao enviar os resultados do quiz' });
        });
}

function obterResultadosQuiz(req, res, userId) {
    if (!userId) {
        return res.status(400).send("O ID do usuário está indefinido!");
    }

    playlistModel.obterResultadosQuiz(userId)
        .then(data => {
            if (data && data.length > 0) {
                console.log('Resultados do quiz obtidos com sucesso:', data);
                res.json(data[0]); // Enviar apenas o primeiro resultado
            } else {
                res.status(404).json({ error: 'Dados não encontrados' });
            }
        })
        .catch(error => {
            console.error('Erro ao obter os resultados do quiz:', error);
            res.status(500).json({ error: 'Erro ao obter os resultados do quiz' });
        });
}

function obterResultadosQuizF(req, res, userId) {
    if (!userId) {
        return res.status(400).send("O ID do usuário está indefinido!");
    }

    playlistModel.obterResultadosQuizF(userId)
        .then(data => {
            if (data && data.length > 0) {
                console.log('Resultados do quiz obtidos com sucesso:', data);
                res.json(data[0]); // Enviar apenas o primeiro resultado
            } else {
                res.status(404).json({ error: 'Dados não encontrados' });
            }
        })
        .catch(error => {
            console.error('Erro ao obter os resultados do quiz:', error);
            res.status(500).json({ error: 'Erro ao obter os resultados do quiz' });
        });
}

function obterResultadosQuizP(req, res, userId) {
    if (!userId) {
        return res.status(400).send("O ID do usuário está indefinido!");
    }

    playlistModel.obterResultadosQuizP(userId)
        .then(data => {
            if (data && data.length > 0) {
                console.log('Resultados do quiz obtidos com sucesso:', data);
                res.json(data[0]); // Enviar apenas o primeiro resultado
            } else {
                res.status(404).json({ error: 'Dados não encontrados' });
            }
        })
        .catch(error => {
            console.error('Erro ao obter os resultados do quiz:', error);
            res.status(500).json({ error: 'Erro ao obter os resultados do quiz' });
        });
}

function obterResultadosQuiz2(req, res, userId) {
    playlistModel.obterResultadosQuiz2(userId)
        .then(data => {
            if (data || data.length > 0) {

                const acertos = [];
                for (let i = 0; i < data.length; i++) {
                    acertos.push(data[i].acertos);
                }
                console.log('Resultados do quiz obtidos com sucesso:', acertos);
                // Envia os dados de acertos no formato esperado pelo frontend
                res.json({ acertos: acertos });
            } else {
                res.status(404).json({ error: 'Dados não encontrados' });
            }
        })
        .catch(error => {
            console.error('Erro ao obter os resultados do quiz:', error);
            res.status(500).json({ error: 'Erro ao obter os resultados do quiz' });
        });
}


module.exports = {
    enviarPlaylistParaBanco,
    deletarPlaylist,
    obterQuantidadePlaylists,
    enviarResultadosQuizParaBanco,
    enviarResultadosQuizParaBanco2,
    enviarResultadosQuizParaBanco3,
    obterResultadosQuiz,
    obterResultadosQuizF,
    obterResultadosQuizP,
    obterResultadosQuiz2
};