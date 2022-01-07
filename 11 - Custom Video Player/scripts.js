/* Get our elements */

const player = document.querySelector('.player'); // The main <div>
const video = player.querySelector('.viewer'); // The actual <video>
const progress = player.querySelector('.progress'); // The whole progress bar
const progressBar = player.querySelector('.progress__filled'); // The amount of the progress bar to be filled in
const toggle = player.querySelector('.toggle'); // The play/pause toggle <button>
const skipButtons = player.querySelectorAll('[data-skip]'); // The skip forward/back <button>s
const ranges = player.querySelectorAll('.player__slider'); // The slider for playback speed
const fullscreen = player.querySelector('.fullscreen');

/* Build our functions */

// Play/pause button
function togglePlay() {
  const method = video.paused ? 'play' : 'pause'; // Need them in strings for bracket method to work
  video[method](); // Bracket method of notation rather than dot because we don't know if 'play' or 'pause' will be passed
}

function updateToggle() {
  const icon = video.paused ? '►' : '||'; // A nicer way to write the below code
  toggle.textContent = icon;

  /*if (e.type === 'pause') toggle.textContent = '||' // Event type can be checked!
  else toggle.textContent = '►';
  PLUS I forgot that the || should appear when it's playing and vice versa*/
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value; // Either video.volume or video.playbackRate
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`; // How much of the flex-parent it takes up
}

function handleScrub(e) {
  console.log(e);
  const scrub = e.layerX / progress.clientWidth; // Where on the progress bar you clicked
  video.currentTime = scrub * video.duration;
}

let scrubFlag = false; // Only for click-drag scrubbing

// FIX THIS
function handleFullscreen() {
  video.setAttribute('fullscreen', '1')
}

/* Hook up the event listeners */


video.addEventListener('click', togglePlay);
video.addEventListener('pause', updateToggle);
video.addEventListener('play', updateToggle);
video.addEventListener('timeupdate', handleProgress);

progress.addEventListener('click', handleScrub);
progress.addEventListener('mousedown', () => scrubFlag = true);
progress.addEventListener('mouseup', () => scrubFlag = false);
progress.addEventListener('mouseout', () => scrubFlag = false);
progress.addEventListener('mousemove', (e) => {
  if (scrubFlag) handleScrub(e);
}); // Could be (e) => scrubFlag && handleScrub(e) instead apparently

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));

fullscreen.addEventListener('click', handleFullscreen);