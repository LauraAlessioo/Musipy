CREATE DATABASE  musipy;
use musipy;


CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50)
);

select * from usuario;	

truncate table usuario;

create table playlist (
	idPlaylist int primary key auto_increment,
    nomePlaylist varchar(45)
);

select * from playlist;
SELECT COUNT(*) FROM playlist;
truncate table playlist;

CREATE TABLE conexao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT,
    fkPlaylist INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(id),
    FOREIGN KEY (fkPlaylist) REFERENCES playlist(idPlaylist)
);

create table quiz (
idQuiz int auto_increment primary key,
acertos int,
erros int
);

drop table conexao;


SELECT playlist.nomePlaylist, usuario.nome
FROM usuario
JOIN conec ON conec.fkUsuario = usuario.id
JOIN playlist ON conec.fkPlaylist = playlist.idPlaylist;





