// Active/Inactive script downloaded from https://www.kirupa.com/html5/detecting_if_the_user_is_idle_or_inactive.htm
// All credit is to author Kirupa

var timeoutID;
var timeToWait = 1000 * 60 * 60; // Expire after one hour (1000 ms in a second * 60 seconds * 60 minutes)

function setup() {
  this.addEventListener("mousemove", resetTimer, false);
  this.addEventListener("mousedown", resetTimer, false);
  this.addEventListener("keypress", resetTimer, false);
  this.addEventListener("DOMMouseScroll", resetTimer, false);
  this.addEventListener("mousewheel", resetTimer, false);
  this.addEventListener("touchmove", resetTimer, false);
  this.addEventListener("MSPointerMove", resetTimer, false);

  startTimer();
}
setup();

function startTimer() {
  timeoutID = window.setTimeout(goInactive, timeToWait);
}

function resetTimer(e) {
  window.clearTimeout(timeoutID);

  goActive();
}

function goInactive() {
  // do something
  logout();
}

function goActive() {
  // do something

  startTimer();
}