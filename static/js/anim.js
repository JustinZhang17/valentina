// Elements
const countdownContainer = document.getElementById("valentina-anim-countdown");
const countdown = document.getElementById("valentina-anim-countdown-text");
const animT = document.getElementById("valentina-anim-ship-travel");
const animS = document.getElementById("valentina-anim-ship-shake");
const animD = document.getElementById("valentina-anim-ship-drop");
const animE = document.getElementById("valentina-anim-env");
const animSt = document.getElementById("valentina-anim-env-stars");
const animL = document.getElementById("valentina-anim-launch");

// Ship starting animation
const startShipAnimation = async () => {
  animL.style.display = "block";

  reTriggerAnimation(animSt);
  reTriggerAnimation(animT);
  reTriggerAnimation(animE);
  reTriggerAnimation(animD);

  countdown.style.color = "#C7D2FE";
  setCountdownBg(true);
  for (let i = 3; i > 0; i--) {
    countdown.innerHTML = i;
    await sleep(1000);
  }
  countdown.innerHTML = "";
  setCountdownBg(false);
  countdown.style.color = "#C41E3A";

  // Ship take off animation
  animS.src = "../static/img/spaceship.svg";
  setAnimState(animSt, "running");
  setAnimState(animL, "running");
  setAnimState(animT, "running");
  setAnimState(animS, "running");
  setAnimState(animE, "running");
  setAnimState(animD, "paused");
};

// Space dropping/crashing animation
const resetShipAnimation = () => {
  animS.src = "../static/img/spaceship-rest.svg";
  countdown.innerHTML = "Crashed";
  setAnimState(animT, "paused");
  setAnimState(animS, "paused");
  setAnimState(animSt, "paused");
  setAnimState(animL, "paused");
  setAnimState(animD, "running");
  animL.style.display = "none";
};

// Reseting animations to their first frame
const reTriggerAnimation = (obj) => {
  obj.style.animation = "none";
  obj.offsetHeight;
  obj.style.animation = null;
};

const setAnimState = (obj, val) => {
  obj.style.animationPlayState = val;
};

const setCountdownBg = (bool) => {
  if (bool) {
    countdownContainer.style.backgroundColor = "rgba(17, 24, 39, 1)";
  } else {
    countdownContainer.style.backgroundColor = "rgba(17, 24, 39, 0)";
  }
};

const createStars = () => {
  const s = document.getElementById("stars");
  for (i = 0; i < 50; i++) {
    const star = document.createElement("div");
    star.className = "star";
    s.appendChild(star);
  }
};

createStars();
