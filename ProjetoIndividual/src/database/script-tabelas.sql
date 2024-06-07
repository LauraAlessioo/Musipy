CREATE DATABASE  musipy;
use musipy;

-- usuario
CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50)
);

select * from usuario;	

truncate table usuario;

-- fim usuario

-- playlist
create table playlist (
	idPlaylist int primary key auto_increment,
    nomePlaylist varchar(45),
	userId INT,
	FOREIGN KEY (userId) REFERENCES usuario(id)
);
select * from playlist;

SELECT COUNT(*) FROM playlist WHERE userId = 1;

truncate table playlist;

-- fim playlist

-- quiz
create table quiz (
idQuiz int auto_increment primary key,
acertos int,
erros int,
fkUsuario int,
	FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);

CREATE TABLE quiz2 (
    idQuiz2 int auto_increment primary key,
    acertos2 int,
    erros2 int,
    fkUsuario2 int,
    FOREIGN KEY (fkUsuario2) REFERENCES usuario(id)
);



select * from quiz2;

drop table quiz2;

CREATE TABLE quiz3 (
    idQuiz3 int auto_increment primary key,
    acertos3 int,
    erros3 int,
    fkUsuario3 int,
    FOREIGN KEY (fkUsuario3) REFERENCES usuario(id)
);

select * from quiz2;

select * from quiz;

SELECT (ROUND((acertos / 4.0) * 100, 0)) AS Acertos,
(ROUND((erros / 4.0) * 100, 0)) AS Erros FROM quiz ORDER BY idQuiz DESC LIMIT 1;

SELECT (ROUND((acertos / 4.0) * 100, 0)) AS Acertos,
(ROUND((erros / 4.0) * 100, 0)) AS Erros FROM quiz WHERE fkUsuario = 1 ORDER BY idQuiz DESC LIMIT 1;

SELECT (ROUND((acertos2 / 4.0) * 100, 0)) AS Acertos,
(ROUND((erros2 / 4.0) * 100, 0)) AS Erros FROM quiz2 WHERE fkUsuario2 = 1 ORDER BY idQuiz2 DESC LIMIT 1;

select acertos from quiz where fkUsuario = 2 ORDER BY idQuiz DESC LIMIT 6;




-- fim quiz








