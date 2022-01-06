/* Get our elements */

const player = document.querySelector('.player'); // The main <div>
const video = player.querySelector('.viewer'); // The actual <video>
const progress = player.querySelector('.progress'); // The whole progress bar
const progressBar = player.querySelector('.progress__filled'); // The amount of the progress bar to be filled in
const toggle = player.querySelector('.toggle'); // The play/pause toggle <button>
const skipButtons = player.querySelectorAll('[data-skip]'); // The skip forward/back <button>s
const ranges = player.querySelectorAll('.player__slider'); // The slider for playback speed

/* Build our functions */

// Play/pause button
function togglePlay() {
  const method = video.paused ? 'play' : 'pause'; // Need them in strings for bracket method to work
  video[method](); // Bracket method of notation rather than dot because we don't know if 'play' or 'pause' will be passed
}

function updateToggle(e) {
  const icon = video.paused ? '►' : '||'; // A nicer way to write the below code
  toggle.textContent = icon;

  /*if (e.type === 'pause') toggle.textContent = '||' // Event type can be checked!
  else toggle.textContent = '►';
  PLUS I forgot that the || should appear when it's playing and vice versa*/
}

/* Hook up the event listeners */

video.addEventListener('click', togglePlay);
video.addEventListener('pause', updateToggle);
video.addEventListener('play', updateToggle);
toggle.addEventListener('click', togglePlay);
