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

-- create table quizFala (
-- idQuiz int auto_increment primary key,
-- acertosF int,
-- errosF int,
-- fkUsuarioF int,
-- FOREIGN KEY (fkUsuarioF) REFERENCES usuario(id)
-- );
-- drop table quizFala;




select * from quiz;

SELECT (ROUND((acertos / 4.0) * 100, 0)) AS Acertos,
(ROUND((erros / 4.0) * 100, 0)) AS Erros FROM quiz ORDER BY idQuiz DESC LIMIT 1;

SELECT (ROUND((acertos / 4.0) * 100, 0)) AS Acertos,
(ROUND((erros / 4.0) * 100, 0)) AS Erros FROM quiz WHERE fkUsuario = 1 ORDER BY idQuiz DESC LIMIT 1;

select acertos from quiz where fkUsuario = 2 ORDER BY idQuiz DESC LIMIT 5;


truncate quiz;

-- fim quiz








