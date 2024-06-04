var database = require("../database/config");

function adicionarPlaylist(nomePlaylist, userId) {
    var instrucaoSql = `
        INSERT INTO playlist (nomePlaylist, userId) VALUES ('${nomePlaylist}', '${userId}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarPlaylist(userId, nomePlaylist) {
    var instrucaoSql = `
        DELETE FROM playlist WHERE userId = '${userId}' AND nomePlaylist = '${nomePlaylist}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterQuantidadePlaylists(userId) {
    var instrucaoSql = `SELECT COUNT(*) AS quantidade_playlists FROM playlist WHERE userId = ${userId}`;
    return database.executar(instrucaoSql);
}
function adicionarResultadosQuiz(acertos, totalQuestoes) {
    var instrucaoSql = `
        INSERT INTO quiz (acertos, erros) VALUES (${acertos}, ${totalQuestoes});
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    adicionarPlaylist,
    deletarPlaylist,
    obterQuantidadePlaylists,
    adicionarResultadosQuiz
};