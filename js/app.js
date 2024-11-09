const mainImg = document.querySelector(".mainImg");
const audio = document.querySelector("audio");
const [retry, prev, play, next, mixed] = document.querySelectorAll(".item");
const musicName = document.querySelector(".music-name");
const [currentTime, duration] = document.querySelector(".times").children;
const changeProgress = document.querySelector(".progress");
const retryIcon = document.querySelector("#retry");
console.log(mixed);

const musics = ["qoshiq1", "qoshiq2", "qoshiq3", "qoshiq4"];

let index = 1;
let repeat = false;
let isMixed = false;

const getAudioImg = (id) => {
  mainImg.setAttribute("src", `./author/${musics[id]}.jpg`);
  audio.setAttribute("src", `./audios/${musics[id]}.mp3`);
};

getAudioImg(index);

function playAudio() {
  if (audio.paused) {
    audio.play();
    play.innerHTML = '<i class="fa-solid fa-pause"></i>';
    nameSound(index);
  } else {
    audio.pause();
    play.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
}

function nextAudio() {
  if (!isMixed) {
    if (index < musics.length - 1) {
      index++;
    } else {
      index = 0;
    }
  } else {
    index = Math.floor(Math.random() * musics.length);
  }
  getAudioImg(index);
  playAudio();
  nameSound(index);
  // if (!audio.paused) {
  //   audio.play();
  // }
}

function prevAudio() {
  if (!isMixed) {
    if (index > 0) {
      index--;
    } else {
      index = musics.length - 1;
    }
  } else {
    index = Math.floor(Math.random() * musics.length);
  }

  getAudioImg(index);
  playAudio();
  nameSound(index);
  // if (!audio.paused) {
  //   audio.play();
  // }
}

// music name rename

function nameSound(index) {
  musicName.textContent = `${musics[index]}`;
}

// proggres time audio

function progress() {
  if (audio.duration > 0) {
    currentTime.textContent =
      parseInt(audio.currentTime / 60) + ":" + parseInt(audio.currentTime % 60);
    duration.textContent =
      parseInt(audio.duration / 60) + ":" + parseInt(audio.duration % 60);
    audioProgres.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  } else {
    currentTime.textContent = "00:00";
    duration.textContent = "00:00";
  }
}

// function change rename audio time
function change(e) {
  let currentPoint = e.offsetX;
  let fullWith = changeProgress.clientWidth;
  audio.currentTime = (currentPoint * audio.duration) / fullWith;
}

// keyboard next prev play pause
function getECode(e) {
  if (e.code == "Space") playAudio();
  else if (e.code == "ArrowRight") nextAudio();
  else if (e.code == "ArrowLeft") prevAudio();
}

const ended = () => {
  if (repeat) {
    audio.currentTime = 0;

    audio.play();
  } else if (isMixed) {
    index = Math.floor(Math.random() * musics.length);
    audio.play();
  } else {
    nextAudio();
  }
};

function getMixed() {
  repeat = false;
  isMixed = !isMixed;

  if (isMixed) {
    if ((shuffle.style.color = " ")) {
      shuffle.style.color = "#b000e6";
      retryIcon.style.color = "#fff";
    }
  } else shuffle.style.color = "#fff";

  // if (isMixed) {
  //
  // }
}

function getRenameColor() {
  repeat = !repeat;
  isMixed = false;
  if (repeat) {
    if ((retryIcon.style.color = " ")) {
      retryIcon.style.color = "#b000e6";
      shuffle.style.color = "#fff";
    }
  } else retryIcon.style.color = "#fff";
}

// evets

mixed.addEventListener("click", getMixed);
retry.addEventListener("click", getRenameColor);
next.addEventListener("click", nextAudio);
prev.addEventListener("click", prevAudio);
play.addEventListener("click", playAudio);
document.addEventListener("keydown", getECode);
audio.addEventListener("timeupdate", progress);
changeProgress.addEventListener("click", change);

audio.addEventListener("ended", () => {
  ended();
});

// const product = [
//   {
//     id: 0,
//     name: "vgbhnj",
//     mainImg: "vhhjvbh",
//     imgs: ["./dyehfe", "./vdsghfds"],
//     desc: "cvghb",
//     price: 4567,
//   },
// ];
