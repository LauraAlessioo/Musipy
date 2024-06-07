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

function adicionarResultadosQuiz2(acertos, totalQuestoes, userId) {
    var instrucaoSql = `
        INSERT INTO quiz2 (acertos2, erros2, fkUsuario2) VALUES (${acertos}, ${totalQuestoes}, ${userId});
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function adicionarResultadosQuiz3(acertos, totalQuestoes, userId) {
    var instrucaoSql = `
        INSERT INTO quiz3 (acertos3, erros3, fkUsuario3) VALUES (${acertos}, ${totalQuestoes}, ${userId});
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

function obterResultadosQuizF(userId) {
    var instrucaoSql = `
        SELECT ROUND((acertos2 / 4.0) * 100, 0) AS Acertos,
        ROUND((erros2 / 4.0) * 100, 0) AS Erros FROM quiz2 WHERE fkUsuario2 = ${userId} ORDER BY idQuiz2 DESC LIMIT 1; `;
        
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterResultadosQuizP(userId) {
    var instrucaoSql = `
        SELECT ROUND((acertos3 / 4.0) * 100, 0) AS Acertos,
        ROUND((erros3 / 4.0) * 100, 0) AS Erros FROM quiz3 WHERE fkUsuario3 = ${userId} ORDER BY idQuiz3 DESC LIMIT 1; `;
        
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function obterResultadosQuiz2(userId) {
    var instrucaoSql = `SELECT acertos FROM quiz WHERE fkUsuario = ${userId} ORDER BY idQuiz LIMIT 6;`;
        
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    adicionarPlaylist,
    deletarPlaylist,
    obterQuantidadePlaylists,
    adicionarResultadosQuiz,
    adicionarResultadosQuiz2,
    adicionarResultadosQuiz3,
    obterResultadosQuiz,
    obterResultadosQuizF,
    obterResultadosQuizP,
    obterResultadosQuiz2
};