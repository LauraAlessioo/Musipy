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

SELECT COUNT(*) FROM playlist;

truncate table playlist;

-- fim playlist

-- quiz
create table quiz (
idQuiz int auto_increment primary key,
acertos int,
erros int
);

select * from quiz;

SELECT CONCAT(ROUND((acertos / 4.0) * 100, 0), '%') AS Acertos,
CONCAT(ROUND((erros / 4.0) * 100, 0), '%') AS Erros	FROM quiz ORDER BY idQuiz DESC LIMIT 1;

truncate quiz;

-- fim quiz








