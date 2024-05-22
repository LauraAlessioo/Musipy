
        var playlists = JSON.parse(localStorage.getItem('playlists')) || [];

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
                localStorage.setItem('playlists', JSON.stringify(playlists));
                conteudoPlay();
            }
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
            playlists.splice(index, 1);
            localStorage.setItem('playlists', JSON.stringify(playlists));
            conteudoPlay();
        }

        function abrirP(cont) {
            var playlist = playlists[cont];
            var showPlay = document.getElementById('espc-playlist');
            var main = document.getElementById('main-board');
            var displayPlay = document.getElementById('display-play');

            main.style.display = "none";
            showPlay.style.display = "flex";

            document.getElementById('playlist-title').textContent = playlist.nomePlaylist;
            document.getElementById('playlist-criador').textContent = `Playlist por: ${playlist.criador}`;
            document.getElementById('playlist-image').src = playlist.image;

            displayPlay.innerHTML = '';
            for (var cont2 = 0; cont2 < playlist.musiquinhas.length; cont2++) {
                var song = playlist.musiquinhas[cont2];
                var div = document.createElement('div');
                div.className = 'playlist';
                div.innerHTML = `
                <div class="cont">
                    <span>${cont2 + 1}</span>
                    <img src="${song.image}" alt="" class="audio-selector" data-audio="${song.audio}">
                    <p>${song.nomeMusica}</p>
                </div>
                <div class="autorM"></div>
                <div class="tempo"></div>
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