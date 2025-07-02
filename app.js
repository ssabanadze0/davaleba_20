function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;

  document.getElementById("clock").textContent = timeString;
}

updateClock();
setInterval(updateClock, 1000);

/////
function updateCountdown() {
  const now = new Date();
  //July 4, 2025 at 20:00
  const target = new Date("2025-07-04T20:00:00");

  const diff = target - now;

  if (diff <= 0) {
    document.getElementById("countdown").textContent = "Countdown finished!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const countdownString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  document.getElementById(
    "countdown"
  ).textContent = `Countdown to July 4th, 20:00 → ${countdownString}`;
}

updateCountdown();
setInterval(updateCountdown, 1000);
////

const slides = document.querySelectorAll(".slide-item");
const pgnWrapper = document.querySelector(".pgn-btns");
let activeSlide = 0;

slides.forEach(() => {
  const btn = document.createElement("button");
  pgnWrapper.appendChild(btn);
});

const btns = document.querySelectorAll(".pgn-btns button");

function renderActiveSlide() {
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === activeSlide);
  });

  btns.forEach((btn, index) => {
    btn.classList.toggle("active", index === activeSlide);
  });
}

function renderNextSlide() {
  activeSlide = (activeSlide + 1) % slides.length;
  renderActiveSlide();
}

function renderPrevSlide() {
  activeSlide = (activeSlide - 1 + slides.length) % slides.length;
  renderActiveSlide();
}

let interval = setInterval(renderNextSlide, 5000);

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(renderNextSlide, 5000);
}

// pg btn cl
btns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    activeSlide = index;
    renderActiveSlide();
    resetInterval();
  });
});

document.getElementById("left-arrow").addEventListener("click", () => {
  renderPrevSlide();
  resetInterval();
});

document.getElementById("right-arrow").addEventListener("click", () => {
  renderNextSlide();
  resetInterval();
});

// Pause
const wrapper = document.querySelector(".slider-wrapper");
wrapper.addEventListener("mouseenter", () => {
  clearInterval(interval);
});

wrapper.addEventListener("mouseleave", () => {
  resetInterval();
});

renderActiveSlide();
