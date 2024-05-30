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
truncate table playlist;

create table conec (
fkUsuario int auto_increment,
fkPlaylist int,
primary key (fkUsuario, fkPlaylist),
foreign key (fkUsuario) references usuario (id),
foreign key (fkPlaylist) references playlist (idPlaylist)
);
drop table conec;

INSERT INTO conec (fkUsuario, fkPlaylist) VALUES (1, 1);
INSERT INTO conec (fkUsuario, fkPlaylist) VALUES (1, 2);

SELECT playlist.nomePlaylist, usuario.nome
FROM usuario
JOIN conec ON conec.fkUsuario = usuario.id
JOIN playlist ON conec.fkPlaylist = playlist.idPlaylist;





