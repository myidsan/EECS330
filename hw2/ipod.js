// Create your global variables below:
var tracklist = ["Let It Happen", "Nangs", "The Moment", "Yes I'm Changing", "Eventually", "Gossip", "The Less I Know The Better", "Past Life", "Disciples", "'Cause I'm A Man"];
let curr_song = 6; // track current playing song as index
var volLevels = [];
let volume = 0; // track volume level

let goStop = new Boolean(false); // is music playing

var time = 0; // time counter
let musicTime; // keeps track of music time

function init() {
  // reset song to start
  let timeBar = document.getElementById('time-bar')
  timeBar.setAttribute("min", 0);
  timeBar.setAttribute("max", 180);
  timeBar.value = 0;

  // reset volume bar
  for (i = 0; i < 6; i++) {
    volLevels[i] = document.getElementById("vl"+`${i}`);
    if (i < 3) {
      document.getElementById("vl"+`${i}`).style.backgroundColor = "#9f5cc4";
    }
  }
  volume = 2;
};

function volUp() {
  // when vol MAX
  if (volume === 5) {
    return; 
  }
  volume++;
  volLevels[volume].style.backgroundColor = "#9f5cc4";
}

function volDown() {
   // when vol min
   if (volume < 0) {
    return; 
  }

  volLevels[volume].style.backgroundColor = "";
  volume--;
}

function switchPlay() {
  // Your code goes here
  let switchBtn = document.getElementById("playBtn");
  let timeBar = document.getElementById("time-bar");
   
  if (switchBtn.innerHTML === "play_arrow") {
    musicTime = setInterval(function() {Timer()}, 1000);
    switchBtn.innerHTML = "pause";
    goStop = true;
  } else {
    clearInterval(musicTime);
    switchBtn.innerHTML = "play_arrow";
    goStop = false;
  } 
}

// user defined
// increments time by 1 every 1000ms when called
function Timer() {
  let startTime = document.getElementById("time-elapsed");
  let timeBar = document.getElementById("time-bar");
  time = time + 1;
  if (time > 180) {
    nextSong();
    time = 0;
    return;
  }
  startTime.innerHTML = secondsToMs(time);
  timeBar.value = time;
}

function nextSong() {
  let playing = document.getElementById("player-song-name");

  // looping over to the beginning of the list
  if (curr_song == tracklist.length - 1) {
    curr_song = 0;
  } else {
    curr_song++;
  }
  playing.innerHTML = tracklist[curr_song];

  // play if play & puase if pause
  checkGoStop();
}

function prevSong() {
  // looping over to the end of the list
  let playing = document.getElementById("player-song-name");

  // looping over to the end of the list
  if (curr_song == 0) {
    curr_song = tracklist.length - 1;
  } else {
    curr_song--;
  }
  playing.innerHTML = tracklist[curr_song];

  checkGoStop();
}

// checks for autoplay 
function checkGoStop() {
  let startTime = document.getElementById("time-elapsed");
  let timeBar = document.getElementById("time-bar");
  if (goStop === true) {
    clearInterval(musicTime);
    time = -1;
    Timer();
    musicTime = setInterval(function() {Timer()}, 1000);
  } else {
    clearInterval(musicTime);
    time = 0;
    timeBar.value = time;
    startTime.innerHTML = secondsToMs(time);
  }
}

function secondsToMs(d) {
    d = Number(d);

    var min = Math.floor(d / 60);
    var sec = Math.floor(d % 60);

    return `0${min}`.slice(-1) + ":" + `00${sec}`.slice(-2);
}

// enables user to drag over the timeline 
function dragTime(newtime) {
  let startTime = document.getElementById("time-elapsed");
  newtime = Number(newtime);

  time = newtime;
  startTime.innerHTML = secondsToMs(newtime);
  Timer();
}

init();
