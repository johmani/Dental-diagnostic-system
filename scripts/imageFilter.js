const mySlider = document.getElementById("contrast-slider");
const sliderValue = document.getElementById("contrast-value");
const mySlider1 = document.getElementById("brightness-slider");
const sliderValue1 = document.getElementById("brightness-value");

function contrastSlider() {
  valPercent = (mySlider.value / mySlider.max) * 100;
  mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
  sliderValue.textContent = mySlider.value;
}

function brightnessSlider() {
  valPercent = (mySlider1.value / mySlider1.max) * 100;
  mySlider1.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
  sliderValue1.textContent = mySlider1.value;
}

brightnessSlider();
contrastSlider();


mySlider.addEventListener("change", () => {
  ctx.filter = "brightness(" + mySlider.value + "%" + ")";
  ctx.drawImage(sourceImage, 0, 0, 1000, 500);
});


mySlider1.addEventListener("change", () => {
  ctx.filter = "contrast(" + mySlider1.value + "%" + ")";
  ctx.drawImage(sourceImage, 0, 0, 1000, 500);
});
