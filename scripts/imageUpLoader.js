var sourceImage;

window.addEventListener(
  "dragover",
  function (e) {
    e.preventDefault();
  },
  false
);
window.addEventListener(
  "drop",
  function (e) {
    e.preventDefault();
  },
  false
);

contaner.ondragover = function (eventArgs) {
  if (!contaner.classList.contains("dragover")) {
    contaner.classList.add("dragover");
  }
};

contaner.ondragleave = function (eventArgs) {
  if (contaner.classList.contains("dragover")) {
    contaner.classList.remove("dragover");
  }
};

contaner.ondrop = function (eventArgs) {
  var dt = eventArgs.dataTransfer;
  if (dt.items.length == 1) {
    if (dt.items[0].kind == "file") {
      var img = new Image();
      img.onload = draw;
      img.onerror = failed;
      img.src = URL.createObjectURL(dt.items[0].getAsFile());
    }
  }
};

upload.onchange = function (eventArgs) {
  var img = new Image();
  img.onload = draw;
  img.onerror = failed;
  img.src = URL.createObjectURL(this.files[0]);
};

function draw() {
  contaner.style.display = "none";
  canvas.style.display = "block";
  canvas.width = 1000;
  canvas.height = 500;
  var ctx = canvas.getContext("2d");

  canvas.style.backgroundImage = this;
  ctx.drawImage(this, 0, 0, 1000, 500);
  sourceImage = this;
}

function failed() {
  console.error("The provided file couldn't be loaded as an Image media");
}
