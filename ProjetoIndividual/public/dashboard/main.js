var userId = sessionStorage.ID_USUARIO;
var playlistsKey = `playlists_${userId}`;
var nomeUsuario =  sessionStorage.NOME_USUARIO;
var playlists = JSON.parse(sessionStorage.getItem(playlistsKey)) || [];

function adicionarPlaylist(nomePredefinido, nomePlaylist, criador, imagem, musiquinhas) {
    var playlistExistente = playlists.find(playlist => playlist.nomePlaylist === nomePlaylist);

    if (playlistExistente) {
        alert('Essa playlist já está em sua biblioteca!');
    } else {
        var novaPlaylist = {
            nomePredefinido: nomePredefinido,
            nomePlaylist: nomePlaylist,
            criador: criador,
            image: imagem,
            musiquinhas: musiquinhas
        };

        playlists.push(novaPlaylist);
        sessionStorage.setItem(playlistsKey, JSON.stringify(playlists));
        conteudoPlay();

        enviarPlaylistParaBanco(nomePlaylist, userId);
    }
}



function identificadorNome(nomeUsuario) {
    const h3Element = document.querySelector('.perf h3');
    h3Element.textContent = `Bem-vindo(a), ${nomeUsuario}`;
}
identificadorNome(nomeUsuario);

function enviarPlaylistParaBanco(nomePlaylist, userId) {
    const playlist = {
        nomePlaylist: nomePlaylist,
        userId: userId
    };
    console.log(userId);
    console.log(nomePlaylist);
    
    fetch("/playlist/enviarPlaylistParaBanco", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(playlist)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Playlist enviada com sucesso:', data);
    })
    .catch(error => {
        console.error('Erro ao enviar a playlist:', error);
    });
}

        function conteudoPlay() {
            var container = document.getElementById('playlist-container');
            container.innerHTML = '';

            for (var cont = 0; cont < playlists.length; cont++) {
                var playlist = playlists[cont];

                var div = document.createElement('div');
                div.className = 'playlist';
                div.setAttribute('onclick', `abrirP(${cont})`);

                div.innerHTML = `
                <div class="musi-esp">
                    <div class="miniatura">
                        <img src="${playlist.image}" alt="">
                    </div>
                    <div class="des-musi">
                        <div class="tt">
                            <span>${playlist.nomePredefinido}</span>
                        </div>
                        <div class="autor">
                            <span>Playlist por: <u>${playlist.criador}</u></span>
                        </div>
                    </div>
                    </div>
                    <div class= "apagar">
                    <i class='bx bxs-trash-alt trash' onclick="deletarPlaylist(${cont}, event)"></i>
                    </div>
                `;
                container.appendChild(div);
            }
        }

        function deletarPlaylist(index, event) {
            event.stopPropagation();
            
            var nomePlaylistDeletada = playlists[index].nomePlaylist;
            var userId = sessionStorage.ID_USUARIO;
         
            
            fetch(`/playlist/deletarPlaylist/${userId}/${nomePlaylistDeletada}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log('Playlist deletada com sucesso:', data);

                playlists.splice(index, 1);
                sessionStorage.setItem(playlistsKey, JSON.stringify(playlists));
                window.location.reload();
                // Atualiza a interface
                conteudoPlay();
            })
            .catch(error => {
                console.error('Erro ao deletar a playlist:', error);
            });
        }
        
            
        function obterQuantidadePlaylists(userId) {

            var userId = sessionStorage.ID_USUARIO;

            fetch(`/playlist/obterQuantidadePlaylists/${userId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Não foi possível obter a quantidade de playlists. Tente novamente mais tarde.');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.quantidadePlaylists !== undefined) {
                        console.log("Quantidade de playlists:", data.quantidadePlaylists);
                        qtdSalva.innerHTML = `<p>${data.quantidadePlaylists}</p>`;
                    } else {
                        throw new Error("A quantidade de playlists não foi recebida corretamente.");
                    }
                })
                .catch(error => {
                    console.error("Erro ao obter a quantidade de playlists:", error);
                    qtdSalva.innerHTML = '<p style="color: #e8e8e8">Não foi possível obter a quantidade de playlists.</p>';
                });
        }
        
        
        obterQuantidadePlaylists(userId);
        
        


        function abrirP(cont) {
            var playlist = playlists[cont];
            var showPlay = document.getElementById('espc-playlist');
            var main = document.getElementById('main-board');
            var displayPlay = document.getElementById('display-play');

            main.style.display = "none";
            showPlay.style.display = "flex";

            document.getElementById('playlist-title').textContent = playlist.nomePlaylist;
            document.getElementById('playlist-criador').textContent = `Playlist por: ${playlist.criador}`;
            document.getElementById('licença').innerHTML = `<br><br> Licença: <a href="https://creativecommons.org/licenses/by/4.0/">CC BY</a>`;

            document.getElementById('playlist-image').src = playlist.image;

            displayPlay.innerHTML = '';
            for (var cont2 = 0; cont2 < playlist.musiquinhas.length; cont2++) {
                var song = playlist.musiquinhas[cont2];
                var div = document.createElement('div');
                div.className = 'playlist';
                div.innerHTML = `
                <div class="cont">
                    <span>${cont2 + 1}</span>
                    <img src="${song.image}" alt="" class="audio-selector"  id="play2" data-audio="${song.audio}">
                    <p>${song.nomeMusica}</p>
                </div>
                <div class="autorM">
                <h2>Compositor:</h2>
                <h4><i class='bx bxs-user-circle'></i>${song.autor}</h4>
                </div>
                <div class="tempo">
                <h3><i class='bx bx-time' ></i>${song.tempo}</h3>
                </div>
                `;
                displayPlay.insertAdjacentHTML('beforeend', div.outerHTML);
            }

            document.querySelectorAll('.audio-selector').forEach(selector => {
                selector.addEventListener('click', (event) => {
                    const audioSrc = event.target.getAttribute('data-audio');
                    audio.src = audioSrc;
                    playPauseIcon.className = 'bx bx-play playin';
                    audio.load();
                });
            });
        }

        var audio = document.getElementById('audio');
        var PouP = document.getElementById('PouP');
        var seekBar = document.getElementById('seekBar');
        var tempoAtual = document.getElementById('currentTime');
        var durationSpan = document.getElementById('duration');
        var playPauseIcon = document.getElementById('playPauseIcon');

        audio.addEventListener('loadedmetadata', function () {
            var duration = audio.duration;
            durationSpan.textContent = formatTime(duration);
        });

        audio.addEventListener('timeupdate', function () {
            var currentTime = audio.currentTime;
            tempoAtual.textContent = formatTime(currentTime);

            var progress = (currentTime / audio.duration) * 100;
            seekBar.value = progress;
        });

        seekBar.addEventListener('change', function () {
            var seekTo = audio.duration * (seekBar.value / 100);
            audio.currentTime = seekTo;
        });

        function formatTime(time) {
            var minutes = Math.floor(time / 60);
            var seconds = Math.floor(time % 60);
            seconds = seconds < 10 ? '0' + seconds : seconds;
            return minutes + ':' + seconds;
        }

        PouP.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playPauseIcon.className = 'bx bx-pause playin';
            } else {
                audio.pause();
                playPauseIcon.className = 'bx bx-play playin';
            }
        });

        conteudoPlay();

        
        function atualizarGraficos(userId) {
            
            if (!userId) {
                console.error("ID do usuário não definido!");
                return;
            }
        
            fetch(`/playlist/obterResultadosQuiz/${userId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao obter dados do servidor');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.Acertos !== undefined && data.Erros !== undefined) {
                        atualizarGraficoAcertosErros(data.Acertos, data.Erros);
                    } else {
                        throw new Error("Dados de acertos e erros não foram recebidos corretamente.");
                    }
                })
                .catch(error => {
                    console.error("Erro ao atualizar os gráficos:", error);
                });
        }
        
        function atualizarGraficoAcertosErros(acertos, erros) {
            const data = [acertos, erros];
            myChart.data.datasets[0].data = data;
            myChart.update();
        }    

        atualizarGraficos(userId);
        
        
        const acert = document.getElementById('myChart');
        
        const myChart = new Chart(acert, {
            type: 'pie',
            data: {
                labels: ['Acertos', 'Erros'],
                datasets: [{
                    label: 'Memorização',
                    backgroundColor: ['#dc67ee', '#212037'],
                    borderColor: '#0000003a',
                    data: [0, 0],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            color: '#fff',
                        },
                    }
                }
            }
        });

        function atualizarGraficos2(userId) {
            if (!userId) {
                console.error("ID do usuário não definido!");
                return;
            }
        
            fetch(`/playlist/obterResultadosQuiz2/${userId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao obter dados do servidor');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Dados recebidos:", data);  // Log para verificar os dados recebidos
                    if (data.acertos !== undefined) {
                        atualizarGraficoAcertos2(data.acertos);
                    } else {
                        throw new Error("Dados de acertos não foram recebidos corretamente.");
                    }
                })
                .catch(error => {
                    console.error("Erro ao atualizar os gráficos:", error);
                });
        }
        
        function atualizarGraficoAcertos2(acertos) {
            myChart2.data.datasets[0].data = acertos;
            myChart2.update();
        }    
        
        const ctx2 = document.getElementById('myChart2').getContext('2d');
        
        const myChart2 = new Chart(ctx2, {
            type: 'line',
            data: {
                labels: ['1ª Tentativa', '2ª Tentativa', '3ª Tentativa', '4ª Tentativa', '5ª Tentativa', '6ª Tentativa'],
                datasets: [{
                    label: 'Acertos',
                    backgroundColor: '#dc67ee',
                    borderColor: '#dc67ee',
                    data: [],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        
        atualizarGraficos2(userId);
        
        

        function atualizarGraficosF(userId) {
            
            if (!userId) {
                console.error("ID do usuário não definido!");
                return;
            }
        
            fetch(`/playlist/obterResultadosQuizF/${userId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao obter dados do servidor');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.Acertos !== undefined && data.Erros !== undefined) {
                        atualizarGraficoAcertosErrosF(data.Acertos, data.Erros);
                    } else {
                        throw new Error("Dados de acertos e erros não foram recebidos corretamente.");
                    }
                })
                .catch(error => {
                    console.error("Erro ao atualizar os gráficos:", error);
                });
        }
        
        function atualizarGraficoAcertosErrosF(acertos, erros) {
            const data = [acertos, erros];
            myChartF.data.datasets[0].data = data;
            myChartF.update();
        }    

        atualizarGraficosF(userId);
        

        const g1 = document.getElementById('myChartF');

        const myChartF = new Chart(g1, {
            type: 'pie',
            data: {
                labels: ['Acertos', 'Erros'],
                datasets: [{
                    label: 'Fala',
                     backgroundColor: ['#dc67ee', '#212037'],
                    borderColor: '#0000003a',
                    data: [0, 0],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            color: '#fff',
                        },
                    }
                }
            }
        });
        



        function atualizarGraficosP(userId) {
            
            if (!userId) {
                console.error("ID do usuário não definido!");
                return;
            }
        
            fetch(`/playlist/obterResultadosQuizP/${userId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao obter dados do servidor');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.Acertos !== undefined && data.Erros !== undefined) {
                        atualizarGraficoAcertosErrosP(data.Acertos, data.Erros);
                    } else {
                        throw new Error("Dados de acertos e erros não foram recebidos corretamente.");
                    }
                })
                .catch(error => {
                    console.error("Erro ao atualizar os gráficos:", error);
                });
        }
        
        function atualizarGraficoAcertosErrosP(acertos, erros) {
            const data = [acertos, erros];
            myChartP.data.datasets[0].data = data;
            myChartP.update();
        }    

        atualizarGraficosP(userId);


        const g2 = document.getElementById('myChartP');
        
        const myChartP = new Chart(g2, {
            type: 'pie',
            data: {
                labels: ['Acertos', 'Erros'],
                datasets: [{
                    label: 'Pain Gone',
                     backgroundColor: ['#dc67ee', '#212037'],
                    borderColor: '#0000003a',
                    data: [0, 0],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            color: '#fff',
                        },
                    }
                }
            }
        });
        
        const g3 = document.getElementById('myChartE');
        
        new Chart(g3, {
            type: 'pie',
            data: {
                labels: ['Acertos', 'Erros'],
                datasets: [{
                    label: 'Emocional',
                     backgroundColor: ['#dc67ee', '#212037'],
                    borderColor: '#0000003a',
                    data: [65, 35],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            color: '#fff',
                        },
                    }
                }
            }
        });
        
        function mudar() {
            const tpGraf = slc_graf.value;
        
           var c1 = document.getElementById('myChart').style.display = "none";
           var c2 = document.getElementById('myChartF').style.display = "none";
           var c3 = document.getElementById('myChartP').style.display = "none";
           var c4 = document.getElementById('myChartE').style.display = "none";
           var c5 = document.getElementById('myChartC').style.display = "none";
        
            if (tpGraf == "memo") {
                document.getElementById('myChart').style.display = "block";
            } else if (tpGraf == "fala") {
                document.getElementById('myChartF').style.display = "block";
            } else if (tpGraf == "pg") {
                document.getElementById('myChartP').style.display = "block";
            } else if (tpGraf == "emo") {
                document.getElementById('myChartE').style.display = "block";
            }
        }