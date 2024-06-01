var database = require("../database/config");

function adicionarPlaylist(nomePlaylist) {
    var instrucaoSql = `
        INSERT INTO playlist (nomePlaylist) VALUES ('${nomePlaylist}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarPlaylist(nomePlaylist) {
    var instrucaoSql = `
        DELETE FROM playlist WHERE nomePlaylist = '${nomePlaylist}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterQuantidadePlaylists() {
    var instrucaoSql = `SELECT COUNT(*) AS quantidade_playlists FROM playlist`;
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