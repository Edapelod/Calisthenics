// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("Calisthenics JS imported successfully!");
});

const activeButtonLeft = document.getElementById(`active-button-left`);
const activeButtonRight = document.getElementById(`active-button-right`);

const infoLeft = document.querySelector(`.hidden-info-left`);
const infoRight = document.querySelector(`.hidden-info-right`);

activeButtonLeft.addEventListener(`click`, function () {
  infoLeft.classList.toggle(`hidden`);
});
activeButtonRight.addEventListener(`click`, function () {
  infoRight.classList.toggle(`hidden`);
});
