let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let wave = document.querySelector("#wave");
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement("audio");

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img: 'https://sevilmusics.com/wp-content/uploads/2024/09/Ebi-Aali-%E2%80%93-Hazeri-Ba-Mane-Divane.jpg',
        name: 'Hazeri Ba Mane Divane',
        artist: 'Ebi Aali',
        music: 'https://dl.sevilmusics.com/cdn/music/srvrf/Ebi%20Aali%20-%20Ghovat%20Ghalb%20[SevilMusic].mp3'
    },
    {
        img: 'https://sevilmusics.com/wp-content/uploads/2024/06/Ebi-Aali-%E2%80%93-Delbari-Takpari.jpg',
        name: 'Delbari Takpari',
        artist: 'Ebi Aali',
        music: 'https://dl.sevilmusics.com/cdn/music/srvrb/Ebi%20Aali%20-%20Shah%20Detar%20[SevilMusic].mp3'
    }
];
loadTrack(track_index);

function loadTrack(track_index) {
    clearInterval(updateTimer);
    reset()

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " Of " + ""+ music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener("ended", nextTrack);
}

function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;

}

function randomTrack() {
    isRandom ? pauseRandom() : playRandom();
}
function playRandom() {
    isRandom = true;
    randomIcon.classList.add('randomActive')
    randomIcon.style.color = '#341f97'
}
function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove('randomActive')
    randomIcon.style.color = ''
}
function repeatTrack() {
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}

function playPauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('Loader')
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('Loader');
    playpause_btn.innerHTML = '<i  class="fa fa-play-circle fa-5x" ></i>';
}
function nextTrack() {
    if (track_index < music_list.length - 1 && isRandom == false) {
        track_index += 1;
    } else if (track_index < music_list.length - 1 && isRandom == true) {
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    } else {
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack() {
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = music_list.length - 1;
    }
    loadTrack(track_index);
    playTrack()
}
function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate() {
    let seekposition = 0;
    if (!isNaN(curr_track.duration)) {
        seekposition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekposition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) {
            currentSeconds = "0" + currentSeconds;
        }
        if (durationSeconds < 10) {
            durationSeconds = "0" + durationSeconds;
        }
        if (currentMinutes < 10) {
            currentMinutes = "0" + currentMinutes;
        }
         if (durationMinutes < 10) {
            durationMinutes = "0" + durationMinutes;
        }
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
//push new musics
music_list.push(
    {
        img: 'https://musics-fa.com/wp-content/uploads/2019/01/A-moghadam3875439875948375934873985.jpg',
        name: 'Zemestoon',
        artist: 'Afshin Moghadam',
        music: 'https://dls.musics-fa.com/tagdl/downloads/Afshin%20Moghadam%20-%20Zemestoon%20(320).mp3'
    },
    {
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/542px-Unknown_person.jpg',
        name: 'Unknown Track',
        artist: 'Unknown Artist',
        music: 'https://musictag.musicmelnet.com/tracks/02/06/Hooshmand%20Aghili%20-%20Farda%20-%20320%20-%20musictag.ir.mp3'
    }
)