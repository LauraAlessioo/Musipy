var database = require("../database/config")


function adicionarPlaylist(nomePlaylist) {
    var instrucaoSql = `
        INSERT INTO playlist (nomePlaylist) VALUES ('${nomePlaylist}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    adicionarPlaylist
};