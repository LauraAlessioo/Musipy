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
function adicionarResultadosQuiz(acertos, totalQuestoes, userId) {
    var instrucaoSql = `
        INSERT INTO quiz (acertos, erros, fkUsuario) VALUES (${acertos}, ${totalQuestoes}, ${userId});
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterResultadosQuiz(userId) {
    var instrucaoSql = `
        SELECT ROUND((acertos / 4.0) * 100, 0) AS Acertos,
        ROUND((erros / 4.0) * 100, 0) AS Erros FROM quiz WHERE fkUsuario = ${userId} ORDER BY idQuiz DESC LIMIT 1; `;
        
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function obterResultadosQuiz2(userId) {
    var instrucaoSql = `SELECT acertos FROM quiz WHERE fkUsuario = ${userId} ORDER BY idQuiz DESC LIMIT 6;`;
        
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    adicionarPlaylist,
    deletarPlaylist,
    obterQuantidadePlaylists,
    adicionarResultadosQuiz,
    obterResultadosQuiz,
    obterResultadosQuiz2
};