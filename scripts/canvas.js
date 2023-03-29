var molarColor = "#FF6075";
var premolorColor = "#7CFF7E";
var caninieColor = "#FFFD7C";
var incisorColor = "#49E9FF";

var crownBridge = "#dc00ff";
var filling = "#ff0000";
var implant = "#e9ff00";
var rootCanalObturation = "#00ff2e";

var popupSize = { x: 75, y: 100 };
var offset = 150;
var canvasPos;

var ctx = canvas.getContext("2d");
var mouseIsEnterBox = false;
var mouse = { x: undefined, y: undefined };

animate();
window.addEventListener("mousemove", function (event) {
  canvasPos = canvas.getBoundingClientRect();
  mouse.x = event.x - canvasPos.left;
  mouse.y = event.y - canvasPos.top;
});

function animate() {
  requestAnimationFrame(animate);
  if (sourceImage == null) return;
  ctx.clearRect(0, 0, 1000, 500);
  ctx.drawImage(sourceImage, 0, 0, 1000, 500);
  mouseIsEnterBox = false;
  drawBoxes();

  if (mouseIsEnterBox) {
    popup.style.visibility = "visible";
  } else {
    popup.style.visibility = "hidden";
  }
}

function drawBoxes() {
  const clonedCanvas = canvas.cloneNode();
  var ctxClonedCanvas = clonedCanvas.getContext("2d");
  ctxClonedCanvas.drawImage(canvas, 0, 0);

  for (var i = 0; i < predictions.length; i++) {
    centerX = predictions[i]["x"];
    centerY = predictions[i]["y"];
    x = centerX - predictions[i]["width"] / 2;
    y = centerY - predictions[i]["height"] / 2;
    width = predictions[i]["width"];
    height = predictions[i]["height"];
    confidence = predictions[i]["confidence"];
    classType = predictions[i]["class"];

    if (!boxFilter(classType)) {
      continue;
    }
    var distance = Math.sqrt(
      Math.pow(mouse.x - centerX, 2) + Math.pow(mouse.y - centerY, 2)
    );

    if (distance <= width / 2) {
      mouseIsEnterBox = true;
      handelPopup(clonedCanvas, x, y, width, height, classType, confidence);

      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.rect(x - 3, y - 3, width + 6, height + 6);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.lineWidth = "0.5";
      ctx.rect(x, y, width, height);
      ctx.stroke();
    }
  }
}

function boxFilter(classType) {
  if ((classType[1] == "1" || classType[1] == "2") && teethToggle.checked) {
    ctx.strokeStyle = incisorColor;
    return true;
  } else if (classType[1] == "3" && teethToggle.checked) {
    ctx.strokeStyle = caninieColor;
    return true;
  } else if (
    (classType[1] == "4" || classType[1] == "5") &&
    teethToggle.checked
  ) {
    ctx.strokeStyle = premolorColor;
    return true;
  } else if (
    (classType[1] == "6" || classType[1] == "7" || classType[1] == "8") &&
    teethToggle.checked
  ) {
    ctx.strokeStyle = molarColor;
    return true;
  } else if (classType == "Crown - bridge" && crownBridgeToggle.checked) {
    ctx.strokeStyle = crownBridge;
    return true;
  } else if (classType == "Filling" && fillingToggle.checked) {
    ctx.strokeStyle = filling;
    return true;
  } else if (classType == "Implant" && implantToggle.checked) {
    ctx.strokeStyle = implant;
    return true;
  } else if (
    classType == "Root Canal Obturation" &&
    rootCanalObturationToggle.checked
  ) {
    ctx.strokeStyle = rootCanalObturation;
    return true;
  }

  return false;
}

function handelPopup(clonedCanvas, x, y, width, height, classType, confidence) {
  var newCanvas = document.createElement("canvas");
  newCanvas.width = width;
  newCanvas.height = height;
  var newCtx = newCanvas.getContext("2d");
  newCtx.drawImage(
    clonedCanvas,
    x - 10,
    y - 10,
    width + 20,
    height + 20,
    0,
    0,
    width,
    height
  );

  var dataURI = newCanvas.toDataURL();
  imagePopup.style.backgroundImage = "url(" + dataURI + ")";
  classTypePopup.innerHTML = classType;
  confidencePopup.innerHTML = "score : " + String(confidence).slice(0, 4);

  if (mouse.x < 500 && mouse.y < 255) {
    popup.style.left = mouse.x + canvasPos.left - popupSize.x - offset + "px";
    popup.style.top = mouse.y + canvasPos.top - popupSize.y - offset + "px";
    popup.style.borderRadius = "20px 20px 0px 20px";
    topPopup.style.borderRadius = "18px 18px 0px 0px";
  } else if (mouse.x < 500 && mouse.y > 255) {
    popup.style.left = mouse.x + canvasPos.left - popupSize.x - offset + "px";
    popup.style.top = mouse.y + canvasPos.top - popupSize.y + offset + "px";
    popup.style.borderRadius = "20px 0px 20px 20px";
    topPopup.style.borderRadius = "18px 0px 0px 0px";
  }
  if (mouse.x > 500 && mouse.y < 255) {
    popup.style.left = mouse.x + canvasPos.left - popupSize.x + offset + "px";
    popup.style.top = mouse.y + canvasPos.top - popupSize.y - offset + "px";
    popup.style.borderRadius = "20px 20px 20px 0px";
    topPopup.style.borderRadius = "18px 18px 0px 0px";
  }
  if (mouse.x > 500 && mouse.y > 255) {
    popup.style.left = mouse.x + canvasPos.left - popupSize.x + offset + "px";
    popup.style.top = mouse.y + canvasPos.top - popupSize.y + offset + "px";
    popup.style.borderRadius = "0px 20px 20px 20px";
    topPopup.style.borderRadius = "0px 18px 0px 0px";
  }
}

// canvas.addEventListener("wheel", (event) => {
//   const direction = Math.sign(event.deltaY);
//   const mouseX = event.clientX - canvas.offsetLeft;
//   const mouseY = event.clientY - canvas.offsetTop;
//   ctx.translate(mouseX, mouseY);

//   // zoom in or out based on the direction
//   if (direction === 1) {
//     ctx.scale(0.99, 0.99);
//   } else {
//     ctx.scale(1.01, 1.01);
//   }
//   ctx.translate(-mouseX, -mouseY);
// });
